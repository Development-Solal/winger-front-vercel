import {useState} from "react";
import {Filter, ChevronDown, ChevronUp, Search, Heart, MapPin, Users, X, Settings} from "lucide-react";

const SidebarMobile = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeFilters] = useState(3);

  return (
    <div className="max-w-sm mx-auto bg-gray-50 min-h-screen">
      {/* Header mobile simulé */}
      {/* <div className="bg-white px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center mr-3">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-rose-500">WINGer</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-gray-600">🔔</span>
          </div>
          <button className="p-2">
            <Users className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div> */}

      {/* Version 1: Compact et élégant */}
      <div className="p-4 space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header des filtres */}
          <div
            className="p-4 bg-gradient-to-r from-rose-50 to-pink-50 border-b border-gray-100 cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-rose-500 rounded-xl flex items-center justify-center">
                  <Filter className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Mes Filtres</h3>
                  <p className="text-sm text-gray-500">{activeFilters} filtres actifs</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {activeFilters > 0 && (
                  <span className="bg-rose-500 text-white text-xs px-2 py-1 rounded-full">{activeFilters}</span>
                )}
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </div>
          </div>

          {/* Filtres étendus */}
          {isExpanded && (
            <div className="p-4 pt-0 space-y-4 border-t border-gray-100">
              {/* Recherche */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Rechercher un prénom..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
              </div>

              {/* Âge */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Âge</label>
                <div className="grid grid-cols-2 gap-2">
                  <button className="bg-rose-500 text-white py-2 px-3 rounded-lg text-sm">18-25</button>
                  <button className="bg-rose-500 text-white py-2 px-3 rounded-lg text-sm">26-35</button>
                  <button className="bg-gray-100 text-gray-600 py-2 px-3 rounded-lg text-sm">36-45</button>
                  <button className="bg-gray-100 text-gray-600 py-2 px-3 rounded-lg text-sm">46+</button>
                </div>
              </div>

              {/* Mes favoris */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mes Favoris</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="radio" name="favorite" className="sr-only" />
                    <div className="w-4 h-4 border-2 border-rose-500 rounded-full bg-rose-500 mr-3"></div>
                    <span className="text-sm text-gray-700">Camille</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="favorite" className="sr-only" />
                    <div className="w-4 h-4 border-2 border-gray-300 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-700">Thomas</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="favorite" className="sr-only" />
                    <div className="w-4 h-4 border-2 border-gray-300 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-700">Julie</span>
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3 pt-2">
                <button className="flex-1 bg-gray-100 text-gray-600 py-2 rounded-lg font-medium">Effacer</button>
                <button className="flex-1 bg-rose-500 text-white py-2 rounded-lg font-medium">Appliquer</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SidebarMobile;
