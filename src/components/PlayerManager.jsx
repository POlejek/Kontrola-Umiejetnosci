import React, { useState, useEffect } from 'react';
import { UserPlus, Users as UsersIcon, Trash2, Share2, ExternalLink, FileText } from 'lucide-react';
import SkillWheelDiagram from './SkillWheelDiagram';
import SkillTreeEditor from './SkillTreeEditor';

// Domyślna struktura umiejętności
const getDefaultSkillTree = () => ({
  id: 'root',
  title: 'Profil Zawodnika',
  skills: [
    { 
      id: 'mental', 
      name: 'MENTAL',
      skills: [
        { id: 'mental-1', name: 'Zaangażowanie i motywacja', children: [] },
        { id: 'mental-2', name: 'Koncentracja Uwagi', children: [] },
        { id: 'mental-3', name: 'Pewność siebie', children: [] },
        { id: 'mental-4', name: 'Radzenie sobie ze stresem', children: [] },
        { id: 'mental-5', name: 'Umiejętności psychospołeczne', children: [] },
        { id: 'mental-6', name: 'Świadomość', children: [] }
      ]
    },
    { 
      id: 'tact', 
      name: 'Taktyczne',
      skills: [
        { id: 'tact-1', name: 'Atak', children: [] },
        { id: 'tact-2', name: 'Transfer A>O', children: [] },
        { id: 'tact-3', name: 'Obrona', children: [] },
        { id: 'tact-4', name: 'Transfer O>A', children: [] }
      ]
    },
    { 
      id: 'tact-tech', 
      name: 'Taktyczno/Techniczne',
      skills: [
        { 
          id: 'tact-tech-atak', 
          name: 'Atakowanie',
          skills: [
            { id: 'tact-tech-atak-1', name: 'Ochrona piłki', children: [] },
            { id: 'tact-tech-atak-2', name: 'Prowadzenie piłki', children: [] },
            { id: 'tact-tech-atak-3', name: 'Przyjęcie', children: [] },
            { id: 'tact-tech-atak-4', name: 'Podanie', children: [] },
            { id: 'tact-tech-atak-5', name: 'Drybling', children: [] },
            { id: 'tact-tech-atak-6', name: 'Uderzenie do bramki', children: [] },
            { id: 'tact-tech-atak-7', name: 'Wsparcie utrzymujące', children: [] },
            { id: 'tact-tech-atak-8', name: 'Wsparcie zdobywające', children: [] },
            { id: 'tact-tech-atak-9', name: 'Gra na trzeciego', children: [] },
            { id: 'tact-tech-atak-10', name: 'Gubienie krycia', children: [] },
            { id: 'tact-tech-atak-11', name: 'Tworzenie przestrzeni', children: [] }
          ]
        },
        { 
          id: 'tact-tech-obrona', 
          name: 'Bronienie',
          skills: [
            { 
              id: 'tact-tech-obrona-1', 
              name: 'Odbiór piłki',
              skills: [
                { id: 'odbior-1', name: 'Wola Bronienia - Chęć odbioru piłki', children: [] },
                { id: 'odbior-2', name: 'Szybkie skócenie odległości', children: [] },
                { id: 'odbior-3', name: 'Zwolnienie tempa biegu', children: [] },
                { id: 'odbior-4', name: 'Wyciągnięcie ramienia', children: [] },
                { id: 'odbior-5', name: 'Ustawienie boczne - kierunkowanie', children: [] },
                { id: 'odbior-6', name: 'Obniżenie środka ciężkości i szerokie ustawienie ramion', children: [] },
                { id: 'odbior-7', name: 'Poruszanie się małymi krokami w bliskiej odległości od atakującego', children: [] },
                { id: 'odbior-8', name: 'Wybór momentu do odbioru', children: [] },
                { id: 'odbior-9', name: 'Wejście między przeciwnika a piłkę', children: [] },
                { id: 'odbior-10', name: 'Defensywne skanowanie - określenie czy 1v1 czy 1v2', children: [] },
                { id: 'odbior-11', name: 'Odcinanie lini podania', children: [] },
                { id: 'odbior-12', name: 'Blokowanie uderzeń', children: [] }
              ]
            },
            { 
              id: 'tact-tech-obrona-2', 
              name: 'Krycie indywidualne',
              skills: [
                { id: 'krycie-ind-1', name: '4xP - Obserwuje Przeciwników, Piłkę, Partnerów, Przestrzeń', children: [] },
                { id: 'krycie-ind-2', name: 'Podjęcie decyzji, którego przeciwnika kryję', children: [] },
                { id: 'krycie-ind-3', name: 'Otwarta pozycja podczas krycia', children: [] },
                { id: 'krycie-ind-4', name: 'Ustawienie obok przeciwnika', children: [] },
                { id: 'krycie-ind-5', name: 'Unikanie wejścia przeciwnika za swoje plecy', children: [] }
              ]
            },
            { 
              id: 'tact-tech-obrona-3', 
              name: 'Asekuracja',
              skills: [
                { id: 'asekuracja-1', name: 'Obserwacja przeciwnika z piłką oraz partnera', children: [] },
                { id: 'asekuracja-2', name: 'Kontrola przestrzeni za plecami', children: [] },
                { id: 'asekuracja-3', name: 'Pozycja boczna podczas asekuracji', children: [] },
                { id: 'asekuracja-4', name: 'Odpowiednia odległość i kąt od partnera', children: [] }
              ]
            },
            { 
              id: 'tact-tech-obrona-4', 
              name: 'Krycie strefowe',
              skills: [
                { id: 'krycie-stref-1', name: 'Zorienowanie na krycie zawodnika w swojej strefie', children: [] },
                { id: 'krycie-stref-2', name: 'Kompaktowość (przesuwanie)', children: [] },
                { id: 'krycie-stref-3', name: 'Przekazywanie krycia', children: [] },
                { id: 'krycie-stref-4', name: 'Gotowość do aktywnej presji', children: [] }
              ]
            },
            { 
              id: 'tact-tech-obrona-5', 
              name: 'Ochrona przestrzeni',
              skills: [
                { id: 'ochrona-przest-1', name: 'Obserwacja przeciwnika z piłką oraz przestrzeni przed i za sobą', children: [] },
                { id: 'ochrona-przest-2', name: 'Boczne ustawienie ciała', children: [] },
                { id: 'ochrona-przest-3', name: 'Tworzenie głębi', children: [] },
                { id: 'ochrona-przest-4', name: 'Skracanie pola gry', children: [] },
                { id: 'ochrona-przest-5', name: 'Gra na spalonego', children: [] }
              ]
            },
            { id: 'tact-tech-obrona-6', name: 'Podwojenie/potrojenie przeciwnika', children: [] }
          ]
        }
      ]
    },
    { 
      id: 'motor', 
      name: 'Motoryczne',
      skills: [
        { id: 'motor-1', name: 'Siła', children: [] },
        { id: 'motor-2', name: 'Szybkość', children: [] },
        { id: 'motor-3', name: 'Gibkość', children: [] },
        { id: 'motor-4', name: 'Koordynacja', children: [] },
        { id: 'motor-5', name: 'Zwinność', children: [] },
        { id: 'motor-6', name: 'Wytrzymałość', children: [] }
      ]
    }
  ]
});

export default function PlayerManager() {
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [view, setView] = useState('players'); // 'players', 'diagram', 'survey-link', 'editor'
  const [newPlayerName, setNewPlayerName] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [globalSkillTree, setGlobalSkillTree] = useState(getDefaultSkillTree());
  
  // Stan dla wyboru poziomu ankiety
  const [showLevelSelector, setShowLevelSelector] = useState(false);
  const [selectedPlayerForLink, setSelectedPlayerForLink] = useState(null);
  const [selectedSurveyType, setSelectedSurveyType] = useState(null);

  // Wczytaj dane z localStorage przy starcie
  useEffect(() => {
    // Wczytaj globalną strukturę umiejętności
    const savedSkillTree = localStorage.getItem('globalSkillTree');
    if (savedSkillTree) {
      setGlobalSkillTree(JSON.parse(savedSkillTree));
    }

    // Wczytaj zawodników
    const savedPlayers = localStorage.getItem('skillTrackerPlayers');
    if (savedPlayers) {
      const parsedPlayers = JSON.parse(savedPlayers);
      setPlayers(parsedPlayers);
    }
  }, []);

  // Zapisz dane do localStorage przy każdej zmianie
  useEffect(() => {
    if (players.length > 0) {
      localStorage.setItem('skillTrackerPlayers', JSON.stringify(players));
    }
  }, [players]);

  // Wczytaj dane zawodnika z URL (jeśli jest parametr playerId)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const playerId = urlParams.get('playerId');
    const surveyType = urlParams.get('survey');
    
    if (playerId) {
      const player = players.find(p => p.id === playerId);
      if (player) {
        setCurrentPlayer(player);
        if (surveyType) {
          setView('diagram');
          // Przekażemy surveyType do komponentu SkillWheelDiagram
        } else {
          setView('diagram');
        }
      }
    }
  }, [players]);

  const addPlayer = () => {
    if (newPlayerName.trim()) {
      const newPlayer = {
        id: `player-${Date.now()}`,
        name: newPlayerName.trim(),
        createdAt: new Date().toISOString(),
        skillTree: JSON.parse(JSON.stringify(globalSkillTree)), // Kopiuj globalną strukturę
        ratings: {}
      };
      
      setPlayers([...players, newPlayer]);
      setNewPlayerName('');
      setShowAddForm(false);
    }
  };

  const saveGlobalSkillTree = (newSkillTree) => {
    // Zapisz globalną strukturę
    setGlobalSkillTree(newSkillTree);
    localStorage.setItem('globalSkillTree', JSON.stringify(newSkillTree));
    
    // Zaktualizuj strukturę dla wszystkich zawodników (zachowaj oceny)
    const updatedPlayers = players.map(player => ({
      ...player,
      skillTree: JSON.parse(JSON.stringify(newSkillTree))
    }));
    setPlayers(updatedPlayers);
    
    alert('Struktura umiejętności została zaktualizowana dla wszystkich zawodników!');
    setView('players');
  };

  const deletePlayer = (playerId) => {
    if (window.confirm('Czy na pewno chcesz usunąć tego zawodnika? Wszystkie dane zostaną utracone.')) {
      setPlayers(players.filter(p => p.id !== playerId));
      if (currentPlayer && currentPlayer.id === playerId) {
        setCurrentPlayer(null);
        setView('players');
      }
    }
  };

  const selectPlayer = (player) => {
    setCurrentPlayer(player);
    setView('diagram');
  };

  const updatePlayerData = (updatedSkillTree, updatedRatings) => {
    setPlayers(players.map(p => 
      p.id === currentPlayer.id 
        ? { ...p, skillTree: updatedSkillTree, ratings: updatedRatings }
        : p
    ));
    setCurrentPlayer({ ...currentPlayer, skillTree: updatedSkillTree, ratings: updatedRatings });
  };

  const generateSurveyLink = (player, surveyType, nodePath = '') => {
    const baseUrl = window.location.origin + window.location.pathname;
    let url = `${baseUrl}?playerId=${player.id}&survey=${surveyType}`;
    if (nodePath) {
      url += `&startNode=${encodeURIComponent(nodePath)}`;
    }
    return url;
  };

  const copySurveyLink = (link) => {
    navigator.clipboard.writeText(link);
    alert('Link skopiowany do schowka!');
  };

  const openLevelSelector = (player, surveyType) => {
    setSelectedPlayerForLink(player);
    setSelectedSurveyType(surveyType);
    setShowLevelSelector(true);
  };

  // Zbiera wszystkie węzły z drzewa (dla selekcji poziomu)
  const collectAllNodes = (tree, path = []) => {
    const nodes = [];
    
    // Dodaj aktualny węzeł
    nodes.push({
      path: path.join('/'),
      name: path.length === 0 ? tree.title : tree.name,
      level: path.length
    });
    
    // Rekurencyjnie dodaj dzieci
    const children = tree.skills || tree.children || [];
    children.forEach((child, index) => {
      const childNodes = collectAllNodes(child, [...path, child.id || `child-${index}`]);
      nodes.push(...childNodes);
    });
    
    return nodes;
  };

  // Widok edytora struktury
  if (view === 'editor') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => setView('players')}
            className="mb-4 text-blue-600 hover:text-blue-800 flex items-center gap-2"
          >
            ← Powrót do listy zawodników
          </button>
          
          <SkillTreeEditor 
            skillTree={globalSkillTree}
            onSave={saveGlobalSkillTree}
          />
        </div>
      </div>
    );
  }

  // Widok listy zawodników
  if (view === 'players') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              System Kontroli Umiejętności
            </h1>
            <p className="text-gray-600">
              Zarządzaj profilami zawodników i ankietami ocen
            </p>
          </div>

          {/* Przycisk edytora struktury */}
          <div className="mb-6">
            <button
              onClick={() => setView('editor')}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition flex items-center justify-center gap-2 shadow-lg"
            >
              <FileText size={20} />
              Edytuj Strukturę Umiejętności (Trener)
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                <UsersIcon size={24} />
                Lista Zawodników ({players.length})
              </h2>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
              >
                <UserPlus size={20} />
                Dodaj Zawodnika
              </button>
            </div>

            {showAddForm && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-gray-700 mb-3">Nowy zawodnik</h3>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={newPlayerName}
                    onChange={(e) => setNewPlayerName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addPlayer()}
                    placeholder="Imię i nazwisko"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={addPlayer}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Dodaj
                  </button>
                  <button
                    onClick={() => {
                      setShowAddForm(false);
                      setNewPlayerName('');
                    }}
                    className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
                  >
                    Anuluj
                  </button>
                </div>
              </div>
            )}

            {players.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <UsersIcon size={48} className="mx-auto mb-4 opacity-50" />
                <p>Brak zawodników. Dodaj pierwszego zawodnika aby rozpocząć.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {players.map((player) => (
                  <div
                    key={player.id}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-400 transition"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-800 text-lg">{player.name}</h3>
                        <p className="text-sm text-gray-500">
                          Utworzono: {new Date(player.createdAt).toLocaleDateString('pl-PL')}
                        </p>
                      </div>
                      <button
                        onClick={() => deletePlayer(player.id)}
                        className="text-red-500 hover:text-red-700 transition"
                        title="Usuń zawodnika"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    
                    <div className="space-y-2">
                      <button
                        onClick={() => selectPlayer(player)}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
                      >
                        <FileText size={18} />
                        Otwórz Profil
                      </button>
                      
                      <div className="pt-2 border-t border-gray-300">
                        <p className="text-xs text-gray-600 mb-2 font-medium">Generuj link do ankiety:</p>
                        <div className="space-y-1">
                          {['player', 'coach', 'team'].map((type) => (
                            <button
                              key={type}
                              onClick={() => openLevelSelector(player, type)}
                              className="w-full bg-gray-100 text-gray-700 py-1.5 px-2 rounded text-sm hover:bg-gray-200 transition flex items-center justify-between gap-2"
                              title="Wybierz poziom i wygeneruj link"
                            >
                              <span className="text-xs">
                                {type === 'player' ? '👤 Zawodnik' : type === 'coach' ? '👨‍🏫 Trener' : '👥 Zespół'}
                              </span>
                              <Share2 size={14} />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-blue-50 rounded-lg p-4 text-sm text-gray-700">
            <h3 className="font-semibold mb-2">💡 Jak to działa:</h3>
            <ul className="space-y-1 list-disc list-inside">
              <li>Dodaj zawodników aby śledzić ich umiejętności</li>
              <li>Otwórz profil aby zarządzać strukturą umiejętności i wypełniać ankiety</li>
              <li>Generuj linki do ankiet - wybierz poziom (cały profil lub konkretną sekcję)</li>
              <li>Wszystkie dane są zapisywane lokalnie w przeglądarce</li>
            </ul>
          </div>

          {/* Modal wyboru poziomu ankiety */}
          {showLevelSelector && selectedPlayerForLink && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Wybierz poziom ankiety
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Zawodnik: <strong>{selectedPlayerForLink.name}</strong> | 
                    Typ: <strong>
                      {selectedSurveyType === 'player' ? 'Zawodnik' : 
                       selectedSurveyType === 'coach' ? 'Trener' : 'Zespół'}
                    </strong>
                  </p>
                </div>

                <div className="p-6 overflow-y-auto max-h-[60vh]">
                  <p className="text-sm text-gray-600 mb-4">
                    Link będzie zawierał wszystkie pytania od wybranego poziomu w dół (wszystkie podpoziomy):
                  </p>

                  <div className="space-y-2">
                    {collectAllNodes(globalSkillTree).map((node, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          const link = generateSurveyLink(selectedPlayerForLink, selectedSurveyType, node.path);
                          copySurveyLink(link);
                          setShowLevelSelector(false);
                        }}
                        className="w-full text-left p-4 bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-400 rounded-lg transition"
                        style={{ marginLeft: `${node.level * 20}px` }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-800">
                              {node.name}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              Poziom {node.level + 1} {node.path ? `• Ścieżka: ${node.path}` : '• Cały profil'}
                            </div>
                          </div>
                          <Share2 size={18} className="text-blue-600" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-6 border-t border-gray-200 bg-gray-50">
                  <button
                    onClick={() => setShowLevelSelector(false)}
                    className="w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition font-semibold"
                  >
                    Anuluj
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Widok diagramu zawodnika
  if (view === 'diagram' && currentPlayer) {
    return (
      <div>
        <div className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{currentPlayer.name}</h2>
            <p className="text-sm text-gray-500">Profil Zawodnika</p>
          </div>
          <button
            onClick={() => {
              setView('players');
              setCurrentPlayer(null);
              // Wyczyść URL
              window.history.pushState({}, '', window.location.pathname);
            }}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition flex items-center gap-2"
          >
            <UsersIcon size={18} />
            Wróć do Listy Zawodników
          </button>
        </div>
        
        <SkillWheelDiagram
          initialSkillTree={currentPlayer.skillTree}
          initialRatings={currentPlayer.ratings}
          onDataChange={updatePlayerData}
          playerName={currentPlayer.name}
        />
      </div>
    );
  }

  return null;
}
