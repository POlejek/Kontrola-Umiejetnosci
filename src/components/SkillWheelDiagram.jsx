import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Download, Users, ClipboardList, BarChart3, ChevronRight, Home, ArrowLeft } from 'lucide-react';

export default function SkillWheelDiagram({ 
  initialSkillTree, 
  initialRatings, 
  onDataChange,
  playerName 
}) {
  // Struktura hierarchiczna umiejętności - każda może mieć children (do 4 poziomów)
  const defaultSkillTree = {
    id: 'root',
    title: 'Profil Zawodnika',
    skills: [
      { id: 'tech', name: 'Technika', children: [] },
      { id: 'tact', name: 'Taktyka', children: [] },
      { id: 'motor', name: 'Motoryka', children: [] },
      { 
        id: 'mental', 
        name: 'Mental',
        skills: [
          { id: 'mental-1', name: 'Zaangażowanie i motywacja', children: [] },
          { id: 'mental-2', name: 'Koncentracja Uwagi', children: [] },
          { id: 'mental-3', name: 'Pewność siebie', children: [] },
          { id: 'mental-4', name: 'Radzenie sobie ze stresem', children: [] },
          { id: 'mental-5', name: 'Umiejętności psychospołeczne', children: [] },
          { id: 'mental-6', name: 'Świadomość', children: [] }
        ]
      }
    ]
  };

  const [skillTree, setSkillTree] = useState(initialSkillTree || defaultSkillTree);
  const [allRatings, setAllRatings] = useState(initialRatings || {});

  // Ścieżka nawigacji - tablica ID od root do obecnego poziomu
  const [navigationPath, setNavigationPath] = useState(['root']);
  
  // Stan UI
  const [currentView, setCurrentView] = useState('diagram'); // diagram, survey
  const [surveyType, setSurveyType] = useState(''); // player, coach, team
  const [tempRatings, setTempRatings] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  // Komunikuj zmiany do rodzica (PlayerManager)
  useEffect(() => {
    if (onDataChange) {
      onDataChange(skillTree, allRatings);
    }
  }, [skillTree, allRatings]);

  // Sprawdź czy jest parametr survey w URL i automatycznie otwórz ankietę
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const surveyParam = urlParams.get('survey');
    const startNodeParam = urlParams.get('startNode');
    
    if (surveyParam && ['player', 'coach', 'team'].includes(surveyParam)) {
      // Jeśli jest startNode, ustaw navigationPath
      if (startNodeParam) {
        const nodePath = startNodeParam.split('/').filter(p => p);
        if (nodePath.length > 0) {
          setNavigationPath(['root', ...nodePath]);
        }
      }
      
      // Odczekaj chwilę na załadowanie danych i nawigację
      setTimeout(() => {
        startSurvey(surveyParam);
      }, 500);
    }
  }, []);

  // Pobierz aktualny węzeł na podstawie ścieżki nawigacji
  const getCurrentNode = () => {
    let node = skillTree;
    for (let i = 1; i < navigationPath.length; i++) {
      const skill = node.skills.find(s => s.id === navigationPath[i]);
      if (skill) {
        node = skill;
        // Jeśli nie ma 'skills', ale ma 'children', normalizuj strukturę
        if (!node.skills && node.children) {
          node = { ...node, skills: node.children };
        }
      }
    }
    return node;
  };

  const getCurrentNodeId = () => navigationPath[navigationPath.length - 1];

  // Pobierz oceny dla aktualnego węzła
  const getCurrentRatings = () => {
    const nodeId = getCurrentNodeId();
    return allRatings[nodeId] || { player: [], coach: [], team: [] };
  };

  // Zapisz oceny dla węzła
  const saveRatingsForNode = (nodeId, type, ratings) => {
    setAllRatings(prev => {
      const existingNode = prev[nodeId] || { player: [], coach: [], team: [] };
      return {
        ...prev,
        [nodeId]: {
          ...existingNode,
          [type]: type === 'team' ? [...(existingNode.team || []), ratings] : ratings
        }
      };
    });
  };

  // Oblicz średnią dla węzła (rekurencyjnie dla children)
  const calculateNodeAverage = (nodeId, ratingType) => {
    const ratings = allRatings[nodeId];
    if (!ratings) return null;

    let data;
    if (ratingType === 'player') data = ratings.player;
    else if (ratingType === 'coach') data = ratings.coach;
    else if (ratingType === 'team') {
      if (ratings.team.length === 0) return null;
      // Średnia z ankiet zespołu
      const node = findNodeById(skillTree, nodeId);
      return node.skills.map((skill, i) => {
        const sum = ratings.team.reduce((acc, rating) => acc + rating[i].value, 0);
        return { name: skill.name, value: sum / ratings.team.length };
      });
    }

    if (!data || data.length === 0) return null;
    return data;
  };

  // Znajdź węzeł po ID
  const findNodeById = (node, id) => {
    if (node.id === id) return node;
    if (node.skills) {
      for (let skill of node.skills) {
        if (skill.id === id) return skill;
        // Szukaj zarówno w children jak i w skills
        if (skill.skills) {
          const found = findNodeById(skill, id);
          if (found) return found;
        }
        if (skill.children) {
          const found = findNodeById(skill, id);
          if (found) return found;
        }
      }
    }
    return null;
  };

  // Oblicz średnią ocenę dla umiejętności na podstawie jej children/skills
  // PRIORYTET: Zawsze używaj średnich z podpoziomów jeśli istnieją
  const calculateAverageFromChildren = (skill, ratingType) => {
    // Sprawdź czy ma podpoziomy
    const childrenArray = skill.skills || skill.children || [];
    
    if (childrenArray.length > 0) {
      // Ma podpoziomy - ZAWSZE użyj średniej z nich (nadrzędność)
      let sum = 0;
      let count = 0;
      
      for (let child of childrenArray) {
        const childAvg = calculateAverageFromChildren(child, ratingType);
        if (childAvg !== null) {
          sum += childAvg;
          count++;
        }
      }

      return count > 0 ? sum / count : null;
    }

    // Brak podpoziomów - użyj bezpośrednich ocen (liść w drzewie)
    const ratings = allRatings[skill.id];
    if (!ratings) return null;

    if (ratingType === 'player' && ratings.player && ratings.player.length > 0) {
      return ratings.player.reduce((sum, r) => sum + r.value, 0) / ratings.player.length;
    } else if (ratingType === 'coach' && ratings.coach && ratings.coach.length > 0) {
      return ratings.coach.reduce((sum, r) => sum + r.value, 0) / ratings.coach.length;
    } else if (ratingType === 'team' && ratings.team && ratings.team.length > 0) {
      // Dla team oblicz średnią ze wszystkich ankiet zespołowych dla tej umiejętności
      const allValues = ratings.team.flatMap(teamRating => 
        teamRating.map(r => r.value)
      );
      return allValues.reduce((sum, val) => sum + val, 0) / allValues.length;
    }

    return null;
  };

  // Nawigacja
  const navigateToSkill = (skillId) => {
    const skill = getCurrentNode().skills.find(s => s.id === skillId);
    // Nawiguj jeśli ma children (stara struktura) lub skills (nowa struktura)
    if (skill && (skill.children || skill.skills)) {
      setNavigationPath([...navigationPath, skillId]);
    }
  };

  const navigateBack = () => {
    if (navigationPath.length > 1) {
      setNavigationPath(navigationPath.slice(0, -1));
    }
  };

  const navigateToRoot = () => {
    setNavigationPath(['root']);
  };

  // Breadcrumbs
  const getBreadcrumbs = () => {
    const breadcrumbs = [];
    let node = skillTree;
    breadcrumbs.push({ id: 'root', title: skillTree.title });
    
    for (let i = 1; i < navigationPath.length; i++) {
      const skill = node.skills.find(s => s.id === navigationPath[i]);
      if (skill) {
        breadcrumbs.push({ id: skill.id, title: skill.name });
        node = skill;
      }
    }
    return breadcrumbs;
  };

  // Zarządzanie umiejętnościami
  const addSkill = () => {
    if (newSkill.trim()) {
      const currentNode = getCurrentNode();
      const newSkillObj = {
        id: `skill-${Date.now()}`,
        name: newSkill.trim()
        // Nie dodajemy ani skills ani children - będą dodane gdy użytkownik kliknie "+ Sub"
      };
      
      updateNodeInTree(getCurrentNodeId(), (node) => ({
        ...node,
        skills: [...node.skills, newSkillObj]
      }));
      
      setNewSkill('');
    }
  };

  const removeSkill = (skillId) => {
    updateNodeInTree(getCurrentNodeId(), (node) => ({
      ...node,
      skills: node.skills.filter(s => s.id !== skillId)
    }));
  };

  const updateSkillName = (skillId, newName) => {
    updateNodeInTree(getCurrentNodeId(), (node) => ({
      ...node,
      skills: node.skills.map(s => s.id === skillId ? { ...s, name: newName } : s)
    }));
  };

  const updateNodeInTree = (nodeId, updateFn) => {
    const updateRecursive = (node) => {
      if (node.id === nodeId) return updateFn(node);
      if (node.skills) {
        return {
          ...node,
          skills: node.skills.map(s => updateRecursive(s))
        };
      }
      return node;
    };
    setSkillTree(updateRecursive(skillTree));
  };

  // Ankiety
  // Zbiera wszystkie pytania (leaf nodes) z drzewa hierarchii
  const collectAllQuestions = (node, pathPrefix = []) => {
    const questions = [];
    const childrenArray = node.skills || node.children || [];
    
    if (childrenArray.length === 0) {
      // To jest liść - dodaj jako pytanie
      questions.push({
        id: node.id,
        name: node.name,
        path: pathPrefix,
        section: pathPrefix.map(p => p.name).join(' → ')
      });
    } else {
      // Węzeł z dziećmi - rekurencyjnie zbieraj pytania
      childrenArray.forEach((child, index) => {
        const childQuestions = collectAllQuestions(
          child, 
          [...pathPrefix, { id: node.id || 'unknown', name: node.name || node.title, index }]
        );
        questions.push(...childQuestions);
      });
    }
    
    return questions;
  };

  const startSurvey = (type) => {
    const currentNode = getCurrentNode();
    
    // Zbierz wszystkie pytania (liście) z hierarchii
    const allQuestions = collectAllQuestions(currentNode);
    
    if (allQuestions.length === 0) {
      console.error('Nie można rozpocząć ankiety - brak pytań (liści) w hierarchii');
      return;
    }
    
    setSurveyType(type);
    // Inicjalizuj odpowiedzi dla wszystkich pytań
    setTempRatings(allQuestions.map(q => ({ 
      id: q.id,
      name: q.name, 
      value: 5,
      path: q.path,
      section: q.section
    })));
    setCurrentView('survey');
  };

  const updateTempRating = (questionId, value) => {
    const updated = tempRatings.map(r => 
      r.id === questionId ? { ...r, value } : r
    );
    setTempRatings(updated);
  };

  const submitSurvey = (callback) => {
    // Nowa prosta logika: zapisz oceny bezpośrednio dla liści
    // Grupuj po sekcji (parent ID)
    const ratingsByParent = {};
    
    tempRatings.forEach(rating => {
      // Każde pytanie ma path - ostatni element to rodzic
      if (rating.path && rating.path.length > 0) {
        const parentInfo = rating.path[rating.path.length - 1];
        const parentId = parentInfo.id;
        
        if (!ratingsByParent[parentId]) {
          ratingsByParent[parentId] = {
            parentId,
            ratings: []
          };
        }
        
        ratingsByParent[parentId].ratings.push({
          id: rating.id,
          name: rating.name,
          value: rating.value
        });
      }
    });
    
    // Zapisz oceny dla każdego rodzica
    Object.values(ratingsByParent).forEach(({ parentId, ratings }) => {
      saveRatingsForNode(parentId, surveyType, ratings);
    });
    
    // Wyczyść stan ankiety i wróć do widoku diagramu
    setTempRatings([]);
    setSurveyType('');
    setCurrentView('diagram');
    
    if (callback) {
      setTimeout(callback, 50);
    }
  };

  // Helper do pobierania węzła po ścieżce indeksów
  const getNodeByPath = (tree, indexPath) => {
    let node = tree;
    for (let i = 0; i < indexPath.length; i++) {
      const children = node.skills || node.children || [];
      node = children[indexPath[i]];
      if (!node) break;
    }
    return node;
  };

  const getLevel = () => navigationPath.length - 1;
  const canGoDeeper = getLevel() < 3; // 0-indexed: 0,1,2,3 = 4 poziomy

  // Pobierz oceny dla wyświetlenia
  // NADRZĘDNOŚĆ: Zawsze używaj średnich z podpoziomów jeśli istnieją
  const getDisplayRatings = () => {
    const currentNode = getCurrentNode();
    const datasets = [];

    ['player', 'coach', 'team'].forEach(type => {
      // Najpierw sprawdź czy którakolwiek umiejętność ma podpoziomy z ocenami
      const data = currentNode.skills.map(skill => {
        const avgFromChildren = calculateAverageFromChildren(skill, type);
        return {
          name: skill.name,
          value: avgFromChildren !== null ? avgFromChildren : null
        };
      });
      
      // Sprawdź czy są jakiekolwiek rzeczywiste dane
      const hasRealData = data.some(d => d.value !== null);

      if (hasRealData) {
        // Określ czy to są dane bezpośrednie czy średnie
        const hasAnyChildrenWithRatings = currentNode.skills.some(skill => {
          const childrenArray = skill.skills || skill.children || [];
          if (childrenArray.length === 0) return false;
          // Sprawdź czy jakiekolwiek dziecko ma oceny
          return childrenArray.some(child => {
            const childAvg = calculateAverageFromChildren(child, type);
            return childAvg !== null;
          });
        });

        const validData = data.map(d => ({
          name: d.name,
          value: d.value !== null ? d.value : 0
        }));
        
        const label = hasAnyChildrenWithRatings 
          ? (type === 'player' ? 'Zawodnik (średnia)' : type === 'coach' ? 'Trener (średnia)' : 'Zespół (średnia)')
          : (type === 'player' ? 'Zawodnik' : type === 'coach' ? 'Trener' : 'Zespół');

        datasets.push({
          data: validData,
          color: type === 'player' ? '#3b82f6' : type === 'coach' ? '#22c55e' : '#f97316',
          label: label
        });
      }
    });

    return datasets;
  };

  const downloadSVG = () => {
    const svg = document.getElementById('skill-wheel-svg');
    if (!svg) return;
    
    const serializer = new XMLSerializer();
    let svgString = serializer.serializeToString(svg);
    svgString = '<?xml version="1.0" encoding="UTF-8"?>\n' + svgString;
    
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `diagram-${getCurrentNode().title || getCurrentNode().name}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const renderWheel = () => {
    const currentNode = getCurrentNode();
    const skills = currentNode.skills;
    const datasets = getDisplayRatings();
    
    const cx = 400;
    const cy = 400;
    const maxRadius = 220;
    const levels = 10;
    const angleStep = (2 * Math.PI) / skills.length;

    const hasData = datasets.length > 0;

    // Funkcja do łamania tekstu
    const wrapText = (text, maxLength = 20) => {
      if (text.length <= maxLength) return [text];
      const words = text.split(' ');
      const lines = [];
      let currentLine = '';
      
      words.forEach(word => {
        if ((currentLine + ' ' + word).trim().length <= maxLength) {
          currentLine = (currentLine + ' ' + word).trim();
        } else {
          if (currentLine) lines.push(currentLine);
          currentLine = word;
        }
      });
      if (currentLine) lines.push(currentLine);
      return lines.length > 0 ? lines : [text];
    };

    return (
      <svg id="skill-wheel-svg" width="800" height="800" viewBox="0 0 800 800">
        <rect width="800" height="800" fill="#fafafa" />
        
        {/* Koncentryczne okręgi */}
        {[...Array(levels)].map((_, i) => {
          const r = ((i + 1) / levels) * maxRadius;
          return (
            <circle
              key={`circle-${i}`}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          );
        })}

        {/* Linie radialne */}
        {skills.map((skill, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const x1 = cx + Math.cos(angle) * maxRadius;
          const y1 = cy + Math.sin(angle) * maxRadius;

          return (
            <line
              key={`line-${i}`}
              x1={cx}
              y1={cy}
              x2={x1}
              y2={y1}
              stroke="#d1d5db"
              strokeWidth="1.5"
            />
          );
        })}

        {/* Rysowanie danych */}
        {hasData ? (
          datasets.map((dataset, idx) => (
            <g key={`dataset-${idx}`}>
              <path
                d={dataset.data.map((item, i) => {
                  const angle = i * angleStep - Math.PI / 2;
                  const radius = (item.value / 10) * maxRadius;
                  const x = cx + Math.cos(angle) * radius;
                  const y = cy + Math.sin(angle) * radius;
                  return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                }).join(' ') + ' Z'}
                fill={`${dataset.color}30`}
                stroke={dataset.color}
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              {dataset.data.map((item, i) => {
                const angle = i * angleStep - Math.PI / 2;
                const radius = (item.value / 10) * maxRadius;
                const x = cx + Math.cos(angle) * radius;
                const y = cy + Math.sin(angle) * radius;
                return (
                  <circle
                    key={`point-${idx}-${i}`}
                    cx={x}
                    cy={y}
                    r="4"
                    fill={dataset.color}
                    stroke="white"
                    strokeWidth="2"
                  />
                );
              })}
            </g>
          ))
        ) : (
          <text
            x={cx}
            y={cy}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#9ca3af"
            fontSize="16"
            fontWeight="500"
          >
            {getLevel() === 0 ? 'Dodaj oceny w podkategoriach' : 'Wypełnij ankiety aby zobaczyć wykres'}
          </text>
        )}

        {/* Etykiety umiejętności - klikalne jeśli mają children lub skills */}
        {skills.map((skill, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const hasChildren = (skill.skills && skill.skills.length > 0) || (skill.children && skill.children.length > 0);
          const textLines = wrapText(skill.name, 18);
          const lineHeight = 14;
          const totalHeight = textLines.length * lineHeight;
          const startY = cy + Math.sin(angle) * (maxRadius + 50) - (totalHeight / 2) + (lineHeight / 2);
          
          return (
            <g key={`label-${i}`}>
              {textLines.map((line, lineIndex) => (
                <text
                  key={`label-line-${i}-${lineIndex}`}
                  x={cx + Math.cos(angle) * (maxRadius + 50)}
                  y={startY + (lineIndex * lineHeight)}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={hasChildren ? "#2563eb" : "#374151"}
                  fontSize="11"
                  fontWeight="500"
                  style={{ cursor: hasChildren ? 'pointer' : 'default' }}
                  onClick={() => hasChildren && navigateToSkill(skill.id)}
                >
                  {line}
                </text>
              ))}
              {hasChildren && (
                <>
                  <circle
                    cx={cx + Math.cos(angle) * (maxRadius + 90)}
                    cy={cy + Math.sin(angle) * (maxRadius + 90)}
                    r="10"
                    fill="#2563eb"
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigateToSkill(skill.id)}
                  />
                  <text
                    x={cx + Math.cos(angle) * (maxRadius + 90)}
                    y={cy + Math.sin(angle) * (maxRadius + 90)}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="white"
                    fontSize="12"
                    fontWeight="bold"
                    style={{ cursor: 'pointer', pointerEvents: 'none' }}
                  >
                    →
                  </text>
                </>
              )}
            </g>
          );
        })}

        <circle cx={cx} cy={cy} r="5" fill="#374151" />
      </svg>
    );
  };

  // Widok Survey
  if (currentView === 'survey') {
    const currentNode = getCurrentNode();
    const surveyTitles = {
      player: 'Ankieta Zawodnika',
      coach: 'Ankieta Trenera',
      team: 'Ankieta Członka Zespołu'
    };

    // Grupuj pytania po sekcjach
    const questionsBySection = {};
    tempRatings.forEach(rating => {
      const section = rating.section || 'Ogólne';
      if (!questionsBySection[section]) {
        questionsBySection[section] = [];
      }
      questionsBySection[section].push(rating);
    });

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              {getBreadcrumbs().map((crumb, i) => (
                <span key={crumb.id}>
                  {i > 0 && <ChevronRight size={16} className="inline mx-1" />}
                  {crumb.title}
                </span>
              ))}
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {surveyTitles[surveyType]}
            </h1>
            <p className="text-gray-600 mb-2">
              Oceń każdą umiejętność w skali od 1 do 10
            </p>
            <p className="text-sm text-blue-600 mb-8">
              Pytań: {tempRatings.length} | Sekcji: {Object.keys(questionsBySection).length}
            </p>

            {/* Wszystkie pytania pogrupowane sekcjami */}
            <div className="space-y-8">
              {Object.entries(questionsBySection).map(([section, questions], sectionIdx) => (
                <div key={sectionIdx} className="border-l-4 border-blue-500 pl-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      Sekcja {sectionIdx + 1}
                    </span>
                    {section}
                  </h2>
                  
                  <div className="space-y-4">
                    {questions.map((rating, qIdx) => (
                      <div key={rating.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition">
                        <label className="block font-medium text-gray-700 mb-3">
                          <span className="text-blue-600 mr-2">#{sectionIdx + 1}.{qIdx + 1}</span>
                          {rating.name}
                        </label>
                        <div className="flex items-center gap-4">
                          <span className="text-xs text-gray-500 w-8">1</span>
                          <input
                            type="range"
                            min="1"
                            max="10"
                            value={rating.value}
                            onChange={(e) => updateTempRating(rating.id, Number(e.target.value))}
                            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                          />
                          <span className="text-xs text-gray-500 w-8">10</span>
                          <span className="text-2xl font-bold text-blue-600 w-12 text-center">
                            {rating.value}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Przyciski akcji */}
            <div className="sticky bottom-0 bg-white pt-6 mt-8 border-t-2 border-gray-200">
              <div className="flex gap-4">
                <button
                  onClick={() => setCurrentView('diagram')}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition font-semibold"
                >
                  Anuluj
                </button>
                <button
                  onClick={submitSurvey}
                  className="flex-2 bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition font-semibold shadow-lg"
                >
                  ✓ Zapisz Ankietę ({tempRatings.length} odpowiedzi)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Widok Setup (główny)
  const currentNode = getCurrentNode();
  const datasets = getDisplayRatings();
  const ratings = getCurrentRatings();
  const hasAnyRatings = ratings.player.length > 0 || ratings.coach.length > 0 || (ratings.team && ratings.team.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Hierarchiczny Diagram Umiejętności
          </h1>
          <p className="text-gray-600">
            Poziom {getLevel() + 1} z 4 - {canGoDeeper ? 'Możesz jeszcze zagłębić się' : 'Maksymalny poziom szczegółowości'}
          </p>
          {getLevel() === 0 && (
            <p className="text-sm text-gray-500 mt-2">
              💡 Wypełnij ankiety w podpoziomach, a średnie wyniki pojawią się automatycznie na tym poziomie
            </p>
          )}
        </div>

        {/* Breadcrumbs */}
        {navigationPath.length > 1 && (
          <div className="mb-6 flex items-center gap-2">
            <button
              onClick={navigateToRoot}
              className="text-blue-600 hover:text-blue-800 transition"
            >
              <Home size={20} />
            </button>
            <ChevronRight size={20} className="text-gray-400" />
            {getBreadcrumbs().slice(1).map((crumb, i) => (
              <React.Fragment key={crumb.id}>
                {i > 0 && <ChevronRight size={20} className="text-gray-400" />}
                <span className="text-gray-700 font-medium">{crumb.title}</span>
              </React.Fragment>
            ))}
            <button
              onClick={navigateBack}
              className="ml-4 text-gray-600 hover:text-gray-800 transition flex items-center gap-1"
            >
              <ArrowLeft size={18} />
              Wstecz
            </button>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Panel edycji */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Zarządzaj umiejętnościami
            </h2>

            {/* Informacja o poziomie */}
            <div className="mb-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-800">
              <strong>Poziom {getLevel() + 1} / 4</strong>
              {canGoDeeper && ' - Możesz utworzyć podpoziomy klikając "+ Sub" lub klikając niebieski tekst na diagramie'}
              {!canGoDeeper && ' - Osiągnięto maksymalny poziom zagnieżdżenia'}
            </div>

            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-3">
                Dodaj nową umiejętność
              </h3>
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                placeholder="Nazwa umiejętności"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={addSkill}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
              >
                <Plus size={20} />
                Dodaj
              </button>
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto mb-6">
              {currentNode.skills.map((skill) => {
                const subSkills = skill.skills || skill.children || [];
                const hasSublevels = subSkills.length > 0;
                return (
                  <div
                    key={skill.id}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        value={skill.name}
                        onChange={(e) => updateSkillName(skill.id, e.target.value)}
                        className="flex-1 px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {hasSublevels && (
                        <>
                          <span className="text-xs text-gray-500 bg-blue-100 px-2 py-1 rounded">
                            {subSkills.length} pod
                          </span>
                          <button
                            onClick={() => navigateToSkill(skill.id)}
                            className="text-blue-600 hover:text-blue-800 transition"
                            title="Przejdź do podpoziomów"
                          >
                            <ChevronRight size={20} />
                          </button>
                        </>
                      )}
                      {canGoDeeper && !hasSublevels && (
                        <button
                          onClick={() => {
                            updateNodeInTree(getCurrentNodeId(), (node) => ({
                              ...node,
                              skills: node.skills.map(s => 
                                s.id === skill.id ? { ...s, skills: [] } : s
                              )
                            }));
                            navigateToSkill(skill.id);
                          }}
                          className="text-green-600 hover:text-green-800 transition text-sm px-2 py-1 bg-green-50 rounded"
                          title="Utwórz podpoziom"
                        >
                          + Sub
                        </button>
                      )}
                      <button
                        onClick={() => removeSkill(skill.id)}
                        className="text-red-500 hover:text-red-700 transition"
                        title="Usuń umiejętność"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Przyciski ankiet */}
            <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <ClipboardList size={20} />
                Generuj ankiety ocen
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => startSurvey('player')}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
                >
                  <Users size={18} />
                  Ankieta dla Zawodnika
                </button>
                <button
                  onClick={() => startSurvey('coach')}
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2"
                >
                  <Users size={18} />
                  Ankieta dla Trenera
                </button>
                <button
                  onClick={() => startSurvey('team')}
                  className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition flex items-center justify-center gap-2"
                >
                  <Users size={18} />
                  Ankieta dla Członka Zespołu
                </button>
              </div>
            </div>
          </div>

          {/* Diagram */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {currentNode.title || currentNode.name || 'Diagram'}
                </h2>
                {currentNode.skills && currentNode.skills.length > 0 && (
                  <p className="text-sm text-gray-500 mt-1">
                    {currentNode.skills.length} {currentNode.skills.length === 1 ? 'umiejętność' : 'umiejętności'}
                  </p>
                )}
              </div>
              <button
                onClick={downloadSVG}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
              >
                <Download size={18} />
                Pobierz SVG
              </button>
            </div>

            {/* Legenda */}
            {datasets.length > 0 && (
              <div className="flex gap-4 mb-4 justify-center">
                {datasets.map((dataset, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: dataset.color }}
                    />
                    <span className="text-sm text-gray-700">{dataset.label}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-center">
              {renderWheel()}
            </div>

            {/* Status ankiet */}
            {hasAnyRatings && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-700 mb-2">Status wypełnionych ankiet:</h4>
                <div className="space-y-1 text-sm">
                  {ratings.player.length > 0 && (
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-600" />
                      <span>Zawodnik: wypełniona</span>
                    </div>
                  )}
                  {ratings.coach.length > 0 && (
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-600" />
                      <span>Trener: wypełniona</span>
                    </div>
                  )}
                  {ratings.team && ratings.team.length > 0 && (
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-orange-600" />
                      <span>Zespół: {ratings.team.length} ankiet(y)</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
