import React, { useState } from 'react';
import { Plus, Trash2, ChevronDown, ChevronRight, Save } from 'lucide-react';

const SkillTreeEditor = ({ skillTree, onSave }) => {
  const [editedTree, setEditedTree] = useState(JSON.parse(JSON.stringify(skillTree)));
  const [expandedNodes, setExpandedNodes] = useState(new Set(['root']));

  const toggleNode = (path) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedNodes(newExpanded);
  };

  const getNodeByPath = (tree, pathArray) => {
    if (pathArray.length === 0) return tree;
    let current = tree;
    for (let i = 0; i < pathArray.length; i++) {
      const index = pathArray[i];
      const children = current.skills || current.children || [];
      current = children[index];
      if (!current) return null;
    }
    return current;
  };

  const updateNodeByPath = (tree, pathArray, updateFn) => {
    if (pathArray.length === 0) {
      return updateFn(tree);
    }
    
    const newTree = JSON.parse(JSON.stringify(tree));
    let current = newTree;
    
    for (let i = 0; i < pathArray.length - 1; i++) {
      const index = pathArray[i];
      const children = current.skills || current.children || [];
      current = children[index];
    }
    
    const lastIndex = pathArray[pathArray.length - 1];
    const children = current.skills || current.children || [];
    children[lastIndex] = updateFn(children[lastIndex]);
    
    return newTree;
  };

  const addSkill = (parentPath) => {
    const newTree = JSON.parse(JSON.stringify(editedTree));
    const parent = parentPath.length === 0 ? newTree : getNodeByPath(newTree, parentPath);
    
    const newSkill = {
      name: 'Nowa umiejętność',
      skills: []
    };
    
    if (!parent.skills && !parent.children) {
      parent.skills = [];
    }
    
    const childrenArray = parent.skills || parent.children || [];
    childrenArray.push(newSkill);
    
    if (parent.children) {
      parent.children = childrenArray;
    } else {
      parent.skills = childrenArray;
    }
    
    setEditedTree(newTree);
    setExpandedNodes(new Set([...expandedNodes, parentPath.join('-') || 'root']));
  };

  const removeSkill = (path) => {
    if (path.length === 0) return; // Nie usuwaj korzenia
    
    const newTree = JSON.parse(JSON.stringify(editedTree));
    const parentPath = path.slice(0, -1);
    const parent = parentPath.length === 0 ? newTree : getNodeByPath(newTree, parentPath);
    
    const lastIndex = path[path.length - 1];
    const children = parent.skills || parent.children || [];
    children.splice(lastIndex, 1);
    
    setEditedTree(newTree);
  };

  const updateSkillName = (path, newName) => {
    const newTree = updateNodeByPath(editedTree, path, (node) => ({
      ...node,
      name: newName
    }));
    setEditedTree(newTree);
  };

  const renderNode = (node, path = [], level = 0) => {
    const pathKey = path.join('-') || 'root';
    const isExpanded = expandedNodes.has(pathKey);
    const children = node.skills || node.children || [];
    const hasChildren = children.length > 0;

    return (
      <div key={pathKey} className="mb-2">
        <div 
          className="flex items-center gap-2 p-2 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
          style={{ marginLeft: `${level * 24}px` }}
        >
          {/* Przycisk rozwijania */}
          {hasChildren && (
            <button
              onClick={() => toggleNode(pathKey)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 text-gray-600" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-600" />
              )}
            </button>
          )}
          {!hasChildren && <div className="w-6" />}

          {/* Pole edycji nazwy */}
          <input
            type="text"
            value={node.name}
            onChange={(e) => updateSkillName(path, e.target.value)}
            className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nazwa umiejętności"
          />

          {/* Przyciski akcji */}
          <button
            onClick={() => addSkill(path)}
            className="p-1 text-green-600 hover:bg-green-50 rounded"
            title="Dodaj podumiejętność"
          >
            <Plus className="w-4 h-4" />
          </button>

          {path.length > 0 && (
            <button
              onClick={() => removeSkill(path)}
              className="p-1 text-red-600 hover:bg-red-50 rounded"
              title="Usuń"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}

          {/* Badge z liczbą dzieci */}
          {hasChildren && (
            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
              {children.length}
            </span>
          )}
        </div>

        {/* Dzieci (rekurencyjnie) */}
        {isExpanded && hasChildren && (
          <div className="mt-1">
            {children.map((child, index) => 
              renderNode(child, [...path, index], level + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  const handleSave = () => {
    onSave(editedTree);
  };

  const handleReset = () => {
    setEditedTree(JSON.parse(JSON.stringify(skillTree)));
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Edytor Struktury Umiejętności
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Zmiany zastosują się do wszystkich zawodników
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleReset}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Resetuj
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Save className="w-4 h-4" />
            Zapisz zmiany
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 border border-gray-200">
        {renderNode(editedTree)}
      </div>

      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Wskazówki:</strong>
        </p>
        <ul className="text-sm text-blue-700 mt-2 space-y-1 list-disc list-inside">
          <li>Kliknij <Plus className="w-3 h-3 inline" /> aby dodać podumiejętność</li>
          <li>Kliknij <Trash2 className="w-3 h-3 inline" /> aby usunąć umiejętność</li>
          <li>Edytuj nazwy bezpośrednio w polach tekstowych</li>
          <li>Możesz tworzyć dowolnie głęboką hierarchię</li>
        </ul>
      </div>
    </div>
  );
};

export default SkillTreeEditor;
