import React, { useState, useEffect } from 'react';
import { UserPlus, Users as UsersIcon, Users, Trash2, Share2, ExternalLink, FileText, Download, LogOut, Save, Upload } from 'lucide-react';
import SkillWheelDiagram from './SkillWheelDiagram';
import SkillTreeEditor from './SkillTreeEditor';
import { useAuth } from '../contexts/AuthContext';
import { useSupabaseData } from '../hooks/useSupabaseData';

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
  const { user, signOut } = useAuth();
  const { loadUserData, saveAllData, loading: dbLoading } = useSupabaseData();
  
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [view, setView] = useState('players'); // 'players', 'diagram', 'survey-link', 'editor'
  const [newPlayerName, setNewPlayerName] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [globalSkillTree, setGlobalSkillTree] = useState(getDefaultSkillTree());
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  
  // Stan dla wyboru poziomu ankiety
  const [showLevelSelector, setShowLevelSelector] = useState(false);
  const [selectedPlayerForLink, setSelectedPlayerForLink] = useState(null);
  const [selectedSurveyType, setSelectedSurveyType] = useState(null);

  // Stan dla rozwiązywania duplikatów
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [duplicates, setDuplicates] = useState([]);
  const [duplicateChoices, setDuplicateChoices] = useState({});
  const [pendingImportData, setPendingImportData] = useState(null);

  // Wczytaj dane z Supabase przy starcie
  useEffect(() => {
    const loadData = async () => {
      if (!user) return;

      try {
        const { skillTree, players: loadedPlayers } = await loadUserData();
        
        if (skillTree) {
          setGlobalSkillTree(skillTree);
        }
        
        if (loadedPlayers && loadedPlayers.length > 0) {
          setPlayers(loadedPlayers);
        }
      } catch (err) {
        console.error('Błąd wczytywania danych:', err);
        // Fallback do localStorage
        const savedSkillTree = localStorage.getItem('globalSkillTree');
        if (savedSkillTree) {
          setGlobalSkillTree(JSON.parse(savedSkillTree));
        }

        const savedPlayers = localStorage.getItem('skillTrackerPlayers');
        if (savedPlayers) {
          const parsedPlayers = JSON.parse(savedPlayers);
          setPlayers(parsedPlayers);
        }
      }
    };

    loadData();
  }, [user]);

  // Auto-zapis do Supabase co 30 sekund (jeśli są zmiany)
  useEffect(() => {
    if (!user || players.length === 0) return;

    const autoSaveInterval = setInterval(async () => {
      try {
        await saveAllData(globalSkillTree, players);
        setLastSaved(new Date());
      } catch (err) {
        console.error('Błąd auto-zapisu:', err);
      }
    }, 30000); // 30 sekund

    return () => clearInterval(autoSaveInterval);
  }, [user, globalSkillTree, players]);

  // Zapisz również do localStorage jako backup
  useEffect(() => {
    if (players.length > 0) {
      localStorage.setItem('skillTrackerPlayers', JSON.stringify(players));
    }
  }, [players]);

  useEffect(() => {
    localStorage.setItem('globalSkillTree', JSON.stringify(globalSkillTree));
  }, [globalSkillTree]);

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
      // Sprawdź duplikaty (bez względu na wielkość liter)
      const normalizedName = newPlayerName.trim().toLowerCase();
      const existingPlayer = players.find(p => p.name.toLowerCase() === normalizedName);
      
      if (existingPlayer) {
        alert(
          `Zawodnik o imieniu "${existingPlayer.name}" już istnieje!\n\n` +
          `Nie można dodać duplikatu.\n` +
          `Jeśli chcesz zaktualizować dane, usuń starego zawodnika i dodaj ponownie.`
        );
        return;
      }

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

  // Funkcja pomocnicza: znajdź wszystkie ID w drzewie
  const collectAllSkillIds = (node, ids = new Set()) => {
    if (node.id) ids.add(node.id);
    const children = node.skills || node.children || [];
    children.forEach(child => collectAllSkillIds(child, ids));
    return ids;
  };

  // Funkcja pomocnicza: wykryj duplikaty po imieniu
  const findDuplicates = (existingPlayers, newPlayers) => {
    const duplicates = [];
    
    newPlayers.forEach(newPlayer => {
      const normalizedNewName = newPlayer.name.toLowerCase().trim();
      const existing = existingPlayers.find(
        ep => ep.name.toLowerCase().trim() === normalizedNewName
      );
      
      if (existing) {
        duplicates.push({
          name: newPlayer.name,
          existing: existing,
          imported: newPlayer
        });
      }
    });
    
    return duplicates;
  };

  // Funkcja: zastosuj wybory użytkownika dla duplikatów
  const applyDuplicateChoices = () => {
    if (!pendingImportData) return;

    const { importedPlayers, shouldAdd, currentSkillIds } = pendingImportData;
    
    // Przygotuj ostateczną listę zawodników
    let finalPlayers = [...players];
    
    // Dla każdego duplikatu zastosuj wybór
    duplicates.forEach(dup => {
      const choice = duplicateChoices[dup.name];
      
      if (choice === 'existing') {
        // Zachowaj istniejącego - nic nie rób
        return;
      } else if (choice === 'imported') {
        // Zastąp istniejącego importowanym
        const importedPlayer = importedPlayers.find(
          p => p.name.toLowerCase().trim() === dup.name.toLowerCase().trim()
        );
        if (importedPlayer) {
          finalPlayers = finalPlayers.map(p => 
            p.id === dup.existing.id ? importedPlayer : p
          );
        }
      }
    });
    
    // Dodaj zawodników bez duplikatów
    const duplicateNames = new Set(duplicates.map(d => d.name.toLowerCase().trim()));
    const nonDuplicates = importedPlayers.filter(
      ip => !duplicateNames.has(ip.name.toLowerCase().trim())
    );
    
    if (shouldAdd) {
      finalPlayers = [...finalPlayers, ...nonDuplicates];
    }
    
    setPlayers(finalPlayers);
    localStorage.setItem('skillTrackerPlayers', JSON.stringify(finalPlayers));
    
    // Zamknij modal
    setShowDuplicateModal(false);
    setDuplicates([]);
    setDuplicateChoices({});
    setPendingImportData(null);
    
    alert(
      `✅ Import zakończony!\\n\\n` +
      `Duplikaty rozwiązane: ${duplicates.length}\\n` +
      `Dodanych nowych: ${nonDuplicates.length}\\n` +
      `Łącznie zawodników: ${finalPlayers.length}`
    );
    setView('players');
  };

  // Funkcja pomocnicza: oznacz nowe umiejętności jako nieocenione
  const markNewSkillsAsUnrated = (playerRatings, oldSkillIds, newSkillIds) => {
    const updatedRatings = { ...playerRatings };
    
    // Znajdź nowe ID (które są w newSkillIds ale nie w oldSkillIds)
    newSkillIds.forEach(skillId => {
      if (!oldSkillIds.has(skillId)) {
        // To jest nowa umiejętność - ustaw domyślnie na 5 i oznacz jako nieocenioną
        updatedRatings[skillId] = {
          player: { value: 5, unrated: true },
          coach: { value: 5, unrated: true },
          team: []
        };
      }
    });
    
    return updatedRatings;
  };

  const saveGlobalSkillTree = (newSkillTree) => {
    // Zbierz stare i nowe ID umiejętności
    const oldSkillIds = collectAllSkillIds(globalSkillTree);
    const newSkillIds = collectAllSkillIds(newSkillTree);
    
    // Zapisz globalną strukturę
    setGlobalSkillTree(newSkillTree);
    localStorage.setItem('globalSkillTree', JSON.stringify(newSkillTree));
    
    // Zaktualizuj strukturę dla wszystkich zawodników i oznacz nowe jako nieocenione
    const updatedPlayers = players.map(player => ({
      ...player,
      skillTree: JSON.parse(JSON.stringify(newSkillTree)),
      ratings: markNewSkillsAsUnrated(player.ratings || {}, oldSkillIds, newSkillIds)
    }));
    setPlayers(updatedPlayers);
    
    alert('Struktura umiejętności została zaktualizowana!\n\nNowe umiejętności będą podświetlone na CZERWONO (ocena 5) do czasu zapisania ankiety przez trenera.');
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

  // Eksport pełnych danych (struktura + zawodnicy)
  const exportData = () => {
    const dataToExport = {
      version: '1.0',
      type: 'full-backup',
      exportDate: new Date().toISOString(),
      globalSkillTree: globalSkillTree,
      players: players
    };

    const jsonString = JSON.stringify(dataToExport, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `kontrola-umiejetnosci-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    alert('Pełny backup został wyeksportowany!');
  };

  // Eksport TYLKO zawodników (bez struktury)
  const exportPlayers = () => {
    if (players.length === 0) {
      alert('Brak zawodników do eksportu!');
      return;
    }

    const dataToExport = {
      version: '1.0',
      type: 'players-only',
      exportDate: new Date().toISOString(),
      players: players.map(p => ({
        id: p.id,
        name: p.name,
        createdAt: p.createdAt,
        ratings: p.ratings || {}
        // NIE eksportujemy skillTree - to będzie pobrane z aktualnej struktury przy imporcie
      }))
    };

    const jsonString = JSON.stringify(dataToExport, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `zawodnicy-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    alert('Dane zawodników zostały wyeksportowane (bez struktury umiejętności)!');
  };

  // Import pełnych danych (struktura + zawodnicy)
  const importData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
        
        // Walidacja podstawowa
        if (!importedData.players || !importedData.globalSkillTree) {
          alert('Nieprawidłowy format pliku! To nie jest pełny backup.');
          return;
        }

        // Pytanie o potwierdzenie
        if (window.confirm(
          `Czy na pewno chcesz zaimportować pełny backup?\n\n` +
          `Data eksportu: ${new Date(importedData.exportDate).toLocaleString('pl-PL')}\n` +
          `Liczba zawodników: ${importedData.players.length}\n\n` +
          `UWAGA: Aktualne dane (struktura + zawodnicy) zostaną nadpisane!`
        )) {
          // Import danych
          setGlobalSkillTree(importedData.globalSkillTree);
          setPlayers(importedData.players);
          
          // Zapisz do localStorage
          localStorage.setItem('globalSkillTree', JSON.stringify(importedData.globalSkillTree));
          localStorage.setItem('skillTrackerPlayers', JSON.stringify(importedData.players));
          
          alert('Pełny backup został zaimportowany!');
          setView('players');
        }
      } catch (error) {
        alert('Błąd podczas importu: ' + error.message);
      }
    };
    reader.readAsText(file);
    
    event.target.value = '';
  };

  // Import TYLKO zawodników (dopasowanie do aktualnej struktury)
  const importPlayers = (event, shouldReplace = false) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
        
        // Walidacja
        if (importedData.type !== 'players-only' || !importedData.players) {
          alert('Nieprawidłowy format pliku! To nie jest plik z danymi zawodników.');
          return;
        }

        // Zbierz ID z aktualnej struktury
        const currentSkillIds = collectAllSkillIds(globalSkillTree);

        // Najpierw pytaj o tryb (dodać czy nadpisać)
        const mode = window.confirm(
          `WYBIERZ TRYB IMPORTU:\n\n` +
          `Data eksportu: ${new Date(importedData.exportDate).toLocaleString('pl-PL')}\n` +
          `Liczba zawodników w pliku: ${importedData.players.length}\n` +
          `Aktualna liczba zawodników: ${players.length}\n\n` +
          `⚠️ UWAGA - Wybierz opcję:\n\n` +
          `[OK] = DODAJ do istniejących (${players.length} + ${importedData.players.length} = ${players.length + importedData.players.length})\n` +
          `[Anuluj] = NADPISZ wszystkich (zostanie tylko ${importedData.players.length})`
        );

        const shouldAdd = mode; // true = dodaj, false = nadpisz

        // Drugie potwierdzenie z wybranym trybem
        const confirmMessage = shouldAdd
          ? `Potwierdzasz DODANIE ${importedData.players.length} zawodników?\n\n` +
            `Aktualni zawodnicy zostaną ZACHOWANI.\n` +
            `Po imporcie będziesz mieć ${players.length + importedData.players.length} zawodników.\n\n` +
            `Zawodnicy otrzymają AKTUALNĄ strukturę umiejętności.\n` +
            `Nowe umiejętności będą CZERWONE (ocena 5).`
          : `⚠️ UWAGA! Potwierdzasz NADPISANIE?\n\n` +
            `Wszyscy aktualni zawodnicy (${players.length}) zostaną USUNIĘCI!\n` +
            `Zostaną zastąpieni ${importedData.players.length} zawodnikami z pliku.\n\n` +
            `Zawodnicy otrzymają AKTUALNĄ strukturę umiejętności.\n` +
            `Nowe umiejętności będą CZERWONE (ocena 5).\n\n` +
            `TEJ OPERACJI NIE MOŻNA COFNĄĆ!`;

        if (!window.confirm(confirmMessage)) {
          alert('Import anulowany.');
          return;
        }

        // Przygotuj zawodników z aktualną strukturą
        const importedPlayers = importedData.players.map(importedPlayer => {
          // Zbierz stare ID z ocen zawodnika
          const playerRatingIds = new Set(Object.keys(importedPlayer.ratings || {}));
          
          // Dopasuj oceny do aktualnej struktury
          const adjustedRatings = markNewSkillsAsUnrated(
            importedPlayer.ratings || {},
            playerRatingIds,
            currentSkillIds
          );

          return {
            ...importedPlayer,
            skillTree: JSON.parse(JSON.stringify(globalSkillTree)), // Aktualna struktura
            ratings: adjustedRatings
          };
        });

        // W trybie NADPISZ - po prostu zastąp wszystkich
        if (!shouldAdd) {
          setPlayers(importedPlayers);
          localStorage.setItem('skillTrackerPlayers', JSON.stringify(importedPlayers));
          
          alert(
            `✅ Nadpisano wszystkich zawodników!\n\n` +
            `Poprzednich zawodników: ${players.length} (usunięto)\n` +
            `Nowych zawodników: ${importedPlayers.length}\n` +
            `Zawodnicy mają aktualną strukturę umiejętności.\n` +
            `Nowe umiejętności są oznaczone CZERWONYM (ocena 5).\n\n` +
            `Wypełnij ankiety aby usunąć czerwone oznaczenie.`
          );
          setView('players');
          return;
        }

        // W trybie DODAJ - sprawdź duplikaty
        const foundDuplicates = findDuplicates(players, importedPlayers);
        
        if (foundDuplicates.length > 0) {
          // Są duplikaty - pokaż modal do rozwiązania
          setDuplicates(foundDuplicates);
          
          // Ustaw domyślne wybory na 'existing'
          const defaultChoices = {};
          foundDuplicates.forEach(dup => {
            defaultChoices[dup.name] = 'existing';
          });
          setDuplicateChoices(defaultChoices);
          
          // Zapisz dane do późniejszego użycia
          setPendingImportData({
            importedPlayers,
            shouldAdd: true,
            currentSkillIds
          });
          
          setShowDuplicateModal(true);
        } else {
          // Brak duplikatów - dodaj wszystkich
          const newPlayers = [...players, ...importedPlayers];
          setPlayers(newPlayers);
          localStorage.setItem('skillTrackerPlayers', JSON.stringify(newPlayers));
          
          alert(
            `✅ Dodano ${importedPlayers.length} zawodników!\n\n` +
            `Łącznie masz teraz: ${newPlayers.length} zawodników.\n` +
            `Zawodnicy mają aktualną strukturę umiejętności.\n` +
            `Nowe umiejętności są oznaczone CZERWONYM (ocena 5).\n\n` +
            `Wypełnij ankiety aby usunąć czerwone oznaczenie.`
          );
          setView('players');
        }
      } catch (error) {
        alert('Błąd podczas importu zawodników: ' + error.message);
      }
    };
    reader.readAsText(file);
    
    event.target.value = '';
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

  // Funkcja ręcznego zapisu
  const handleManualSave = async () => {
    setSaving(true);
    try {
      await saveAllData(globalSkillTree, players);
      setLastSaved(new Date());
      alert('✅ Dane zostały zapisane w chmurze!');
    } catch (err) {
      alert('❌ Błąd zapisu: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    if (window.confirm('Czy na pewno chcesz się wylogować?')) {
      await signOut();
    }
  };

  // Widok listy zawodników
  if (view === 'players') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Nagłówek z przyciskami zapisu i wylogowania */}
          <div className="bg-white rounded-xl shadow-lg p-4 mb-6 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Zalogowany jako:</p>
              <p className="font-semibold text-gray-800">{user?.email}</p>
              {lastSaved && (
                <p className="text-xs text-green-600 mt-1">
                  Ostatni zapis: {lastSaved.toLocaleTimeString('pl-PL')}
                </p>
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleManualSave}
                disabled={saving}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center gap-2 disabled:opacity-50"
              >
                <Save size={18} />
                {saving ? 'Zapisywanie...' : 'Zapisz Teraz'}
              </button>
              <button
                onClick={handleSignOut}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition flex items-center gap-2"
              >
                <LogOut size={18} />
                Wyloguj
              </button>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              System Kontroli Umiejętności
            </h1>
            <p className="text-gray-600">
              Zarządzaj profilami zawodników i ankietami ocen
            </p>
          </div>

          {/* Przyciski edytora struktury i instrukcji */}
          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setView('editor')}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition flex items-center justify-center gap-2 shadow-lg"
            >
              <FileText size={20} />
              Edytuj Strukturę Umiejętności (Trener)
            </button>
            <a
              href="instrukcja.html"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-teal-700 transition flex items-center justify-center gap-2 shadow-lg"
            >
              <FileText size={20} />
              📚 Instrukcja Użytkownika
            </a>
          </div>

          {/* Sekcja: Pełny Backup (Struktura + Zawodnicy) */}
          <div className="mb-6 bg-white rounded-xl shadow-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              💾 Pełny Backup (Struktura + Zawodnicy)
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={exportData}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2 shadow-lg"
                title="Eksportuj wszystko: strukturę i zawodników"
              >
                <Share2 size={20} />
                Eksportuj Wszystko
              </button>
              <label className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                title="Importuj wszystko: strukturę i zawodników">
                <Share2 size={20} className="transform rotate-180" />
                Importuj Wszystko
                <input
                  type="file"
                  accept=".json"
                  onChange={importData}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Sekcja: Tylko Zawodnicy */}
          <div className="mb-6 bg-white rounded-xl shadow-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              👥 Tylko Zawodnicy (bez struktury)
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Eksportuj/Importuj tylko dane zawodników. Przy imporcie używana jest AKTUALNA struktura umiejętności.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={exportPlayers}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-lg"
                title="Eksportuj tylko zawodników (bez struktury)"
              >
                <Users size={20} />
                Eksportuj Zawodników
              </button>
              <label className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                title="Importuj zawodników - dopasują się do aktualnej struktury">
                <Users size={20} className="transform rotate-180" />
                Importuj Zawodników
                <input
                  type="file"
                  accept=".json"
                  onChange={importPlayers}
                  className="hidden"
                />
              </label>
            </div>
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

          {/* Modal rozwiązywania duplikatów przy imporcie */}
          {showDuplicateModal && duplicates.length > 0 && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-800">
                    ⚠️ Znaleziono duplikaty
                  </h2>
                  <p className="text-sm text-gray-600 mt-2">
                    Poniżsi zawodnicy już istnieją w aplikacji. Wybierz, którą wersję chcesz zachować:
                  </p>
                </div>

                <div className="p-6 overflow-y-auto max-h-[60vh]">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-3 text-left font-semibold">
                          Imię i nazwisko
                        </th>
                        <th className="border border-gray-300 p-3 text-center font-semibold w-1/3">
                          Obecny w aplikacji
                        </th>
                        <th className="border border-gray-300 p-3 text-center font-semibold w-1/3">
                          Importowany
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {duplicates.map((dup, idx) => {
                        const existingRatingsCount = Object.keys(dup.existing.ratings || {}).length;
                        const importedRatingsCount = Object.keys(dup.imported.ratings || {}).length;
                        
                        return (
                          <tr key={idx} className="hover:bg-gray-50">
                            <td className="border border-gray-300 p-3 font-medium">
                              {dup.name}
                            </td>
                            <td className="border border-gray-300 p-3 text-center">
                              <div className="flex flex-col items-center space-y-2">
                                <div className="text-sm text-gray-600">
                                  <div>Utworzony: {dup.existing.createdAt ? new Date(dup.existing.createdAt).toLocaleDateString('pl-PL') : 'N/A'}</div>
                                  <div>Ocen: {existingRatingsCount}</div>
                                </div>
                                <label className="flex items-center space-x-2 cursor-pointer">
                                  <input
                                    type="radio"
                                    name={`duplicate-${idx}`}
                                    checked={duplicateChoices[dup.name] === 'existing'}
                                    onChange={() => {
                                      setDuplicateChoices(prev => ({
                                        ...prev,
                                        [dup.name]: 'existing'
                                      }));
                                    }}
                                    className="w-4 h-4"
                                  />
                                  <span className="text-sm font-medium">Zachowaj obecnego</span>
                                </label>
                              </div>
                            </td>
                            <td className="border border-gray-300 p-3 text-center">
                              <div className="flex flex-col items-center space-y-2">
                                <div className="text-sm text-gray-600">
                                  <div>Utworzony: {dup.imported.createdAt ? new Date(dup.imported.createdAt).toLocaleDateString('pl-PL') : 'N/A'}</div>
                                  <div>Ocen: {importedRatingsCount}</div>
                                </div>
                                <label className="flex items-center space-x-2 cursor-pointer">
                                  <input
                                    type="radio"
                                    name={`duplicate-${idx}`}
                                    checked={duplicateChoices[dup.name] === 'imported'}
                                    onChange={() => {
                                      setDuplicateChoices(prev => ({
                                        ...prev,
                                        [dup.name]: 'imported'
                                      }));
                                    }}
                                    className="w-4 h-4"
                                  />
                                  <span className="text-sm font-medium">Zastąp importowanym</span>
                                </label>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>

                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>ℹ️ Informacja:</strong> Pozostali zawodnicy (bez duplikatów) zostaną dodani automatycznie.
                    </p>
                  </div>
                </div>

                <div className="p-6 border-t border-gray-200 bg-gray-50 flex gap-3">
                  <button
                    onClick={() => {
                      setShowDuplicateModal(false);
                      setDuplicates([]);
                      setDuplicateChoices({});
                      setPendingImportData(null);
                    }}
                    className="flex-1 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition font-semibold"
                  >
                    Anuluj import
                  </button>
                  <button
                    onClick={() => {
                      applyDuplicateChoices();
                      setShowDuplicateModal(false);
                    }}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                  >
                    Zastosuj wybory i kontynuuj import
                  </button>
                </div>
              </div>
            </div>
          )}

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

  // Funkcja: Generuj raport HTML zawodnika
  const generatePlayerReport = () => {
    if (!currentPlayer) return;

    const ratings = currentPlayer.ratings || {};

    // Funkcja pomocnicza: Buduj hierarchię z sekcjami i podsekcjami
    const buildHierarchy = (node, level = 0) => {
      const children = node.skills || node.children || [];
      
      if (children.length === 0 && node.id && node.id !== 'root') {
        // To jest liść (pytanie/umiejętność)
        return {
          type: 'skill',
          id: node.id,
          name: node.name,
          level: level
        };
      }
      
      // To jest sekcja lub podsekcja
      const processedChildren = children.map(child => buildHierarchy(child, level + 1));
      
      return {
        type: level === 0 ? 'root' : (level === 1 ? 'section' : 'subsection'),
        id: node.id,
        name: node.name,
        level: level,
        children: processedChildren
      };
    };

    const hierarchy = buildHierarchy(currentPlayer.skillTree);

    // Zbierz wszystkie umiejętności (liście) dla globalnych statystyk
    const collectAllSkills = (node) => {
      const skills = [];
      if (node.type === 'skill') {
        skills.push(node);
      } else if (node.children) {
        node.children.forEach(child => {
          skills.push(...collectAllSkills(child));
        });
      }
      return skills;
    };

    const allSkills = collectAllSkills(hierarchy);

    // Oblicz statystyki
    const getRatingValue = (skillId, type) => {
      const rating = ratings[skillId]?.[type];
      if (!rating) return null;
      
      // Dla team - to jest tablica ankiet zespołowych
      if (type === 'team' && Array.isArray(rating)) {
        if (rating.length === 0) return null;
        // Pomiń nieocenione i oblicz średnią z ostatniej ankiety lub wszystkich
        const validRatings = rating.filter(r => r.unrated !== true);
        if (validRatings.length === 0) return null;
        // Zwróć ostatnią ocenę (najnowszą)
        const lastRating = validRatings[validRatings.length - 1];
        return typeof lastRating.value === 'number' ? lastRating.value : parseFloat(lastRating.value);
      }
      
      // Dla player i coach - pojedyncze obiekty
      // Sprawdź czy ocena nie jest oznaczona jako nieoceniona
      if (rating.unrated === true) return null;
      const value = rating.value !== undefined ? rating.value : rating;
      // Konwertuj na liczbę aby uniknąć konkatenacji stringów
      return typeof value === 'number' ? value : parseFloat(value);
    };

    const stats = {
      player: { total: 0, count: 0, rated: 0 },
      coach: { total: 0, count: 0, rated: 0 },
      team: { total: 0, count: 0, rated: 0 }
    };

    allSkills.forEach(skill => {
      ['player', 'coach', 'team'].forEach(type => {
        const value = getRatingValue(skill.id, type);
        if (value !== null && !isNaN(value)) {
          stats[type].total += Number(value);
          stats[type].count++;
          stats[type].rated++;
        }
      });
    });

    // Oblicz średnie
    const avgPlayer = stats.player.count > 0 ? (stats.player.total / stats.player.count).toFixed(2) : 'Brak';
    const avgCoach = stats.coach.count > 0 ? (stats.coach.total / stats.coach.count).toFixed(2) : 'Brak';
    const avgTeam = stats.team.count > 0 ? (stats.team.total / stats.team.count).toFixed(2) : 'Brak';

    // Funkcja: Oblicz średnią dla zestawu umiejętności
    const calculateAverage = (skills, type) => {
      let total = 0;
      let count = 0;
      skills.forEach(skill => {
        const value = getRatingValue(skill.id, type);
        if (value !== null && !isNaN(value)) {
          total += Number(value);
          count++;
        }
      });
      return count > 0 ? (total / count).toFixed(2) : null;
    };

    // Funkcja: Generuj SVG diagram radarowy dla głównych sekcji
    const generateRadarSVG = () => {
      const mainSections = hierarchy.children || [];
      if (mainSections.length === 0) return '';

      const cx = 400;
      const cy = 400;
      const maxRadius = 300;
      const levels = 10;
      const angleStep = (2 * Math.PI) / mainSections.length;

      // Przygotuj dane dla każdej sekcji
      const sectionData = mainSections.map(section => {
        const skills = collectAllSkills(section);
        return {
          name: section.name,
          player: calculateAverage(skills, 'player'),
          coach: calculateAverage(skills, 'coach'),
          team: calculateAverage(skills, 'team')
        };
      });

      // Funkcja do generowania punktów ścieżki
      const generatePath = (type) => {
        const points = sectionData.map((data, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const value = data[type] || 0;
          const radius = (value / 10) * maxRadius;
          const x = cx + Math.cos(angle) * radius;
          const y = cy + Math.sin(angle) * radius;
          return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
        }).join(' ') + ' Z';
        return points;
      };

      const colors = {
        player: '#3b82f6',
        coach: '#10b981',
        team: '#f59e0b'
      };

      return `
        <svg width="800" height="800" viewBox="0 0 800 800" style="max-width: 100%; height: auto;">
          <rect width="800" height="800" fill="#fafafa" />
          
          <!-- Koncentryczne okręgi -->
          ${[...Array(levels)].map((_, i) => {
            const r = ((i + 1) / levels) * maxRadius;
            return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#e5e7eb" stroke-width="1" />`;
          }).join('')}

          <!-- Linie radialne -->
          ${sectionData.map((_, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const x1 = cx + Math.cos(angle) * maxRadius;
            const y1 = cy + Math.sin(angle) * maxRadius;
            return `<line x1="${cx}" y1="${cy}" x2="${x1}" y2="${y1}" stroke="#d1d5db" stroke-width="1.5" />`;
          }).join('')}

          <!-- Dane - wypełnienia -->
          ${['player', 'coach', 'team'].map(type => {
            const hasData = sectionData.some(d => d[type] !== null);
            if (!hasData) return '';
            return `<path d="${generatePath(type)}" fill="${colors[type]}30" stroke="${colors[type]}" stroke-width="2.5" stroke-linejoin="round" />`;
          }).join('')}

          <!-- Dane - punkty -->
          ${['player', 'coach', 'team'].map(type => {
            return sectionData.map((data, i) => {
              const value = data[type];
              if (value === null) return '';
              const angle = i * angleStep - Math.PI / 2;
              const radius = (value / 10) * maxRadius;
              const x = cx + Math.cos(angle) * radius;
              const y = cy + Math.sin(angle) * radius;
              return `<circle cx="${x}" cy="${y}" r="4" fill="${colors[type]}" stroke="white" stroke-width="2" />`;
            }).join('');
          }).join('')}

          <!-- Etykiety sekcji -->
          ${sectionData.map((section, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const labelX = cx + Math.cos(angle) * (maxRadius + 50);
            const labelY = cy + Math.sin(angle) * (maxRadius + 50);
            return `<text x="${labelX}" y="${labelY}" text-anchor="middle" dominant-baseline="middle" fill="#374151" font-size="13" font-weight="600">${section.name}</text>`;
          }).join('')}

          <!-- Środkowy punkt -->
          <circle cx="${cx}" cy="${cy}" r="5" fill="#374151" />
        </svg>
      `;
    };

    // Funkcja: Generuj rekurencyjnie hierarchię z accordion
    const renderHierarchyNode = (node, level = 0) => {
      if (node.type === 'skill') {
        // Pojedyncza umiejętność - wiersz tabeli
        const playerVal = getRatingValue(node.id, 'player');
        const coachVal = getRatingValue(node.id, 'coach');
        const teamVal = getRatingValue(node.id, 'team');
        
        const getRatingClass = (val) => {
          if (val === null) return 'unrated';
          if (val <= 4) return 'low';
          if (val <= 7) return 'medium';
          return 'high';
        };
        
        const formatRating = (val) => {
          if (val === null) return '<span class="rating unrated">—</span>';
          return `<span class="rating ${getRatingClass(val)}">${val}</span>`;
        };

        return `
          <div class="skill-row level-${level}">
            <div class="skill-name">${node.name}</div>
            <div class="skill-ratings">
              <div class="skill-rating">${formatRating(playerVal)}</div>
              <div class="skill-rating">${formatRating(coachVal)}</div>
              <div class="skill-rating">${formatRating(teamVal)}</div>
            </div>
          </div>
        `;
      }

      // Sekcja lub podsekcja
      if (!node.children || node.children.length === 0) return '';

      const skills = collectAllSkills(node);
      const avgPlayer = calculateAverage(skills, 'player');
      const avgCoach = calculateAverage(skills, 'coach');
      const avgTeam = calculateAverage(skills, 'team');
      const formatAvg = (avg) => avg !== null ? avg : '—';

      const nodeId = `node-${node.id || Math.random().toString(36).substr(2, 9)}`;
      const levelClass = level === 1 ? 'section' : level === 2 ? 'subsection' : 'subsubsection';

      return `
        <div class="hierarchy-node ${levelClass} level-${level}">
          <div class="node-header" onclick="toggleNode('${nodeId}')">
            <div class="node-title-row">
              <span class="toggle-icon" id="icon-${nodeId}">▶</span>
              <span class="node-name">${node.name}</span>
            </div>
            <div class="node-averages">
              <div class="node-avg player-avg" title="Zawodnik">${formatAvg(avgPlayer)}</div>
              <div class="node-avg coach-avg" title="Trener">${formatAvg(avgCoach)}</div>
              <div class="node-avg team-avg" title="Zespół">${formatAvg(avgTeam)}</div>
            </div>
          </div>
          <div class="node-content" id="${nodeId}" style="display: none;">
            ${node.children.map(child => renderHierarchyNode(child, level + 1)).join('')}
          </div>
        </div>
      `;
    };

    // Generuj HTML raportu
    const reportHTML = `
<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Raport: ${currentPlayer.name}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 40px 20px;
      color: #333;
    }
    .report-container {
      max-width: 1400px;
      margin: 0 auto;
      background: white;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 40px;
      text-align: center;
    }
    .header h1 {
      font-size: 2.5em;
      margin-bottom: 10px;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
    }
    .header p {
      font-size: 1.1em;
      opacity: 0.9;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      padding: 40px;
      background: #f8f9fa;
    }
    .stat-card {
      background: white;
      padding: 25px;
      border-radius: 15px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      text-align: center;
      border-top: 4px solid;
    }
    .stat-card.player { border-color: #3b82f6; }
    .stat-card.coach { border-color: #10b981; }
    .stat-card.team { border-color: #f59e0b; }
    .stat-card h3 {
      font-size: 0.9em;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 10px;
      opacity: 0.7;
    }
    .stat-card .value {
      font-size: 3em;
      font-weight: bold;
      margin: 10px 0;
    }
    .stat-card.player .value { color: #3b82f6; }
    .stat-card.coach .value { color: #10b981; }
    .stat-card.team .value { color: #f59e0b; }
    .stat-card .label {
      font-size: 0.85em;
      color: #666;
    }
    
    /* Diagram radarowy */
    .radar-section {
      padding: 40px;
      background: white;
      text-align: center;
    }
    .radar-section h2 {
      font-size: 1.8em;
      margin-bottom: 20px;
      color: #667eea;
    }
    .legend {
      display: flex;
      justify-content: center;
      gap: 30px;
      margin-top: 20px;
      flex-wrap: wrap;
    }
    .legend-item {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .legend-color {
      width: 20px;
      height: 20px;
      border-radius: 4px;
    }
    
    /* Hierarchia z accordion */
    .content {
      padding: 40px;
      background: #f8f9fa;
    }
    .content h2 {
      font-size: 1.8em;
      margin-bottom: 30px;
      color: #667eea;
      text-align: center;
    }
    .hierarchy-node {
      margin-bottom: 15px;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      background: white;
    }
    .hierarchy-node.section {
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    .node-header {
      padding: 18px 25px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: all 0.2s;
      user-select: none;
    }
    .node-header:hover {
      background: #f8f9fa;
    }
    .hierarchy-node.section .node-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }
    .hierarchy-node.section .node-header:hover {
      background: linear-gradient(135deg, #5568d3 0%, #653b8e 100%);
    }
    .hierarchy-node.subsection .node-header {
      background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
      color: white;
      padding: 15px 20px;
    }
    .hierarchy-node.subsection .node-header:hover {
      background: linear-gradient(135deg, #7c4ee0 0%, #db2777 100%);
    }
    .hierarchy-node.subsubsection .node-header {
      background: #e0e7ff;
      color: #4338ca;
      padding: 12px 18px;
    }
    .node-title-row {
      display: flex;
      align-items: center;
      gap: 12px;
      font-weight: 600;
      font-size: 1.15em;
    }
    .hierarchy-node.subsection .node-title-row {
      font-size: 1.05em;
    }
    .hierarchy-node.subsubsection .node-title-row {
      font-size: 0.95em;
    }
    .toggle-icon {
      transition: transform 0.3s;
      font-size: 0.9em;
    }
    .toggle-icon.open {
      transform: rotate(90deg);
    }
    .node-averages {
      display: flex;
      gap: 15px;
      align-items: center;
    }
    .node-avg {
      min-width: 45px;
      padding: 6px 12px;
      border-radius: 8px;
      font-weight: bold;
      font-size: 1em;
      text-align: center;
      background: white;
      color: #333;
    }
    .hierarchy-node.section .node-avg,
    .hierarchy-node.subsection .node-avg {
      background: rgba(255,255,255,0.95);
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .node-avg.player-avg { border: 2px solid #3b82f6; color: #3b82f6; }
    .node-avg.coach-avg { border: 2px solid #10b981; color: #10b981; }
    .node-avg.team-avg { border: 2px solid #f59e0b; color: #f59e0b; }
    .node-content {
      padding: 20px;
      background: #fafafa;
    }
    .hierarchy-node.section .node-content {
      padding: 25px;
    }
    .hierarchy-node.subsection .node-content,
    .hierarchy-node.subsubsection .node-content {
      padding: 15px;
      background: white;
    }
    
    /* Wiersze umiejętności */
    .skill-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 14px 20px;
      margin-bottom: 8px;
      background: white;
      border-radius: 8px;
      border-left: 4px solid #667eea;
      box-shadow: 0 1px 4px rgba(0,0,0,0.08);
    }
    .skill-row:hover {
      box-shadow: 0 2px 8px rgba(0,0,0,0.12);
    }
    .skill-name {
      font-weight: 500;
      color: #374151;
      flex: 1;
    }
    .skill-ratings {
      display: flex;
      gap: 12px;
    }
    .skill-rating {
      min-width: 50px;
      text-align: center;
    }
    .rating {
      display: inline-block;
      min-width: 40px;
      padding: 6px 12px;
      border-radius: 8px;
      font-weight: bold;
      text-align: center;
      font-size: 0.95em;
    }
    .rating.unrated {
      background: #fee2e2;
      color: #dc2626;
    }
    .rating.low {
      background: #fef3c7;
      color: #d97706;
    }
    .rating.medium {
      background: #dbeafe;
      color: #2563eb;
    }
    .rating.high {
      background: #d1fae5;
      color: #059669;
    }
    
    .footer {
      background: #f8f9fa;
      padding: 30px;
      text-align: center;
      border-top: 3px solid #667eea;
    }
    .footer p {
      color: #666;
      font-size: 0.9em;
    }
    
    /* Przyciski akcji */
    .action-buttons {
      position: fixed;
      top: 20px;
      right: 20px;
      display: flex;
      gap: 10px;
      z-index: 1000;
    }
    .action-btn {
      padding: 12px 24px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      font-size: 0.95em;
      transition: all 0.2s;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .action-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(0,0,0,0.2);
    }
    .save-btn {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
    }
    .print-btn {
      background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
      color: white;
    }
    
    @media print {
      body { background: white; padding: 0; }
      .report-container { box-shadow: none; }
      .node-header { cursor: default; }
      .node-content { display: block !important; }
      .toggle-icon { display: none; }
      .action-buttons { display: none; }
    }
  </style>
  <script>
    function toggleNode(nodeId) {
      const content = document.getElementById(nodeId);
      const icon = document.getElementById('icon-' + nodeId);
      
      if (content.style.display === 'none' || content.style.display === '') {
        content.style.display = 'block';
        icon.classList.add('open');
      } else {
        content.style.display = 'none';
        icon.classList.remove('open');
      }
    }
    
    // Funkcja do rozwinięcia wszystkich sekcji
    function expandAll() {
      const allContents = document.querySelectorAll('.node-content');
      const allIcons = document.querySelectorAll('.toggle-icon');
      allContents.forEach(content => content.style.display = 'block');
      allIcons.forEach(icon => icon.classList.add('open'));
    }
    
    // Funkcja do zwinięcia wszystkich sekcji
    function collapseAll() {
      const allContents = document.querySelectorAll('.node-content');
      const allIcons = document.querySelectorAll('.toggle-icon');
      allContents.forEach(content => content.style.display = 'none');
      allIcons.forEach(icon => icon.classList.remove('open'));
    }
    
    // Funkcja do zapisu raportu jako HTML
    function saveReport() {
      const htmlContent = document.documentElement.outerHTML;
      const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
      const link = document.createElement('a');
      const fileName = 'Raport_${currentPlayer.name.replace(/\s+/g, '_')}_' + new Date().toISOString().split('T')[0] + '.html';
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    }
    
    // Funkcja do drukowania
    function printReport() {
      window.print();
    }
  </script>
</head>
<body>
  <!-- Przyciski akcji -->
  <div class="action-buttons">
    <button onclick="saveReport()" class="action-btn save-btn">
      💾 Zapisz do pliku
    </button>
    <button onclick="printReport()" class="action-btn print-btn">
      🖨️ Drukuj
    </button>
  </div>

  <div class="report-container">
    <div class="header">
      <h1>📊 Raport Zawodnika</h1>
      <p>${currentPlayer.name}</p>
      <p style="font-size: 0.9em; margin-top: 10px;">Wygenerowano: ${new Date().toLocaleDateString('pl-PL', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })}</p>
    </div>

    <div class="stats-grid">
      <div class="stat-card player">
        <h3>Ocena Zawodnika</h3>
        <div class="value">${avgPlayer}</div>
        <div class="label">${stats.player.rated} / ${allSkills.length} umiejętności</div>
      </div>
      <div class="stat-card coach">
        <h3>Ocena Trenera</h3>
        <div class="value">${avgCoach}</div>
        <div class="label">${stats.coach.rated} / ${allSkills.length} umiejętności</div>
      </div>
      <div class="stat-card team">
        <h3>Ocena Zespołowa</h3>
        <div class="value">${avgTeam}</div>
        <div class="label">${stats.team.rated} / ${allSkills.length} umiejętności</div>
      </div>
    </div>

    <div class="radar-section">
      <h2>📈 Diagram Radarowy</h2>
      <div style="display: flex; justify-content: center;">
        ${generateRadarSVG()}
      </div>
      <div class="legend">
        <div class="legend-item">
          <div class="legend-color" style="background: #3b82f6;"></div>
          <span>Zawodnik</span>
        </div>
        <div class="legend-item">
          <div class="legend-color" style="background: #10b981;"></div>
          <span>Trener</span>
        </div>
        <div class="legend-item">
          <div class="legend-color" style="background: #f59e0b;"></div>
          <span>Zespół</span>
        </div>
      </div>
    </div>

    <div class="content">
      <h2>🎯 Szczegółowa Hierarchia Umiejętności</h2>
      <div style="text-align: center; margin-bottom: 20px;">
        <button onclick="expandAll()" style="padding: 10px 20px; margin: 0 5px; border: none; background: #10b981; color: white; border-radius: 8px; cursor: pointer; font-weight: 600;">
          ▼ Rozwiń Wszystko
        </button>
        <button onclick="collapseAll()" style="padding: 10px 20px; margin: 0 5px; border: none; background: #6b7280; color: white; border-radius: 8px; cursor: pointer; font-weight: 600;">
          ▲ Zwiń Wszystko
        </button>
      </div>
      ${hierarchy.children ? hierarchy.children.map(section => {
        if (section.type === 'section') {
          return renderHierarchyNode(section, 1);
        }
        return '';
      }).join('') : ''}
    </div>

    <div class="footer">
      <p><strong>System Kontroli Umiejętności</strong> • Raport wygenerowany automatycznie</p>
      <p style="margin-top: 10px;">Kliknij na sekcję aby ją rozwinąć/zwinąć • Nieocenione umiejętności oznaczone "—"</p>
    </div>
  </div>
</body>
</html>
    `;

    // Otwórz raport w nowym oknie
    const reportWindow = window.open('', '_blank');
    reportWindow.document.write(reportHTML);
    reportWindow.document.close();
    
    // Opcjonalnie automatyczne drukowanie po załadowaniu
    reportWindow.onload = () => {
      // Użytkownik może ręcznie wydrukować używając Ctrl+P
    };
  };

  // Widok diagramu zawodnika
  if (view === 'diagram' && currentPlayer) {
    return (
      <div>
        <div className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{currentPlayer.name}</h2>
            <p className="text-sm text-gray-500">Profil Zawodnika</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={generatePlayerReport}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-5 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition flex items-center gap-2 shadow-lg"
              title="Pobierz ładny raport z wszystkimi wynikami i diagramami"
            >
              <Download size={18} />
              Pobierz Raport
            </button>
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
