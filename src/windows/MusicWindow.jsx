import React, { useState } from 'react';
import { Play, Pause, Search, Music2, Disc, Loader2 } from 'lucide-react';

export default function MusicWindow({ 
  tracks, 
  currentTrack, 
  isPlaying, 
  selectTrack, 
  togglePlay, 
  addTrackByYoutube,
  isDarkMode = true 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // Cole a sua chave de API do Google Cloud entre as aspas abaixo:
  const YOUTUBE_API_KEY = "AIzaSyAOpDqvuIJbWInkHFqcjLUxP6a1mbALc9A";

  const handleSearchYoutube = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!searchTerm.trim()) return;

    // Se o usuário colar um link direto, extrai o ID sem consumir cota de busca
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = searchTerm.match(regExp);

    if (match && match[2].length === 11) {
      const videoId = match[2];
      addTrackByYoutube({
        id: videoId,
        videoId: videoId,
        title: "Vídeo do YouTube",
        artist: "YouTube",
        cover: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
      });
      setSearchTerm('');
      return;
    }

    if (!YOUTUBE_API_KEY || YOUTUBE_API_KEY === "SUA_CHAVE_AQUI") {
      setErrorMessage("Por favor, cole sua chave de API válida no arquivo MusicWindow.jsx.");
      return;
    }

    setIsSearching(true);
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchTerm)}&type=video&maxResults=5&key=${YOUTUBE_API_KEY}`
      );
      const data = await res.json();
      
      if (data.error) {
        setErrorMessage(data.error.message || "Erro na consulta à API do YouTube.");
      } else if (data.items) {
        const results = data.items.map(item => ({
          id: item.id.videoId,
          videoId: item.id.videoId,
          title: item.snippet.title,
          artist: item.snippet.channelTitle,
          cover: item.snippet.thumbnails?.default?.url || ''
        }));
        setSearchResults(results);
      }
    } catch (err) {
      setErrorMessage("Falha na conexão com a API do YouTube.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectSearchResult = (track) => {
    addTrackByYoutube(track);
    setSearchResults([]);
    setSearchTerm('');
  };

  return (
    <div className={`w-full h-full flex flex-col p-4 select-none ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* Barra de Pesquisa */}
      <form onSubmit={handleSearchYoutube} className="flex items-center gap-2 mb-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Pesquisar música ou colar link do YouTube..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-9 pr-4 py-2 text-xs rounded-xl border outline-none transition-all ${
              isDarkMode 
                ? 'bg-slate-800/80 border-slate-700 focus:border-red-500 text-slate-200' 
                : 'bg-white border-slate-300 focus:border-red-500 text-slate-800'
            }`}
          />
        </div>

        <button 
          type="submit"
          disabled={isSearching}
          className="px-3 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold flex items-center gap-1.5 transition shrink-0 cursor-pointer disabled:opacity-50"
        >
          {isSearching ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Buscar'}
        </button>
      </form>

      {/* Alerta de Erro caso a cota acabe ou chave seja inválida */}
      {errorMessage && (
        <div className="mb-3 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-[11px]">
          {errorMessage}
        </div>
      )}

      {/* Resultados da Busca */}
      {searchResults.length > 0 && (
        <div className={`mb-3 p-2 rounded-xl border max-h-48 overflow-y-auto space-y-1 ${isDarkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-100 border-slate-200'}`}>
          <p className="text-[10px] font-semibold text-slate-400 px-2 py-1">Resultados encontrados (clique para tocar):</p>
          {searchResults.map((result) => (
            <div 
              key={result.videoId}
              onClick={() => handleSelectSearchResult(result)}
              className={`flex items-center gap-2.5 p-1.5 rounded-lg cursor-pointer text-xs transition ${isDarkMode ? 'hover:bg-slate-700/80' : 'hover:bg-slate-200'}`}
            >
              {result.cover ? (
                <img src={result.cover} alt="" className="w-9 h-9 rounded-md object-cover shrink-0" />
              ) : (
                <div className="w-9 h-9 rounded-md bg-slate-800 flex items-center justify-center shrink-0">
                  <Music2 className="w-4 h-4 text-slate-400" />
                </div>
              )}
              <div className="overflow-hidden flex-1">
                <p className="font-medium truncate text-slate-200">{result.title}</p>
                <p className="text-[10px] text-slate-400 truncate">{result.artist}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Faixa Atual em Destaque */}
      {currentTrack && (
        <div className={`p-4 rounded-2xl border mb-3 flex items-center justify-between ${
          isDarkMode ? 'bg-slate-800/40 border-slate-700/60' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center gap-3 overflow-hidden">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-red-500/20 text-red-400 shrink-0 ${isPlaying ? 'animate-spin-slow' : ''}`}>
              <Disc className="w-6 h-6" />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate">{currentTrack.title}</p>
              <p className="text-xs text-slate-400 truncate">{currentTrack.artist}</p>
            </div>
          </div>

          <button 
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center transition shrink-0 cursor-pointer"
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
          </button>
        </div>
      )}

      {/* Fila de Reprodução */}
      <div className="flex-1 overflow-y-auto space-y-1 pr-1">
        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Fila de Reprodução</p>
        {tracks.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-500">
            Nenhuma música na fila. Pesquise pelo nome ou cole um link do YouTube acima!
          </div>
        ) : (
          tracks.map((track) => {
            const isSelected = currentTrack?.id === track.id;
            return (
              <div 
                key={track.id}
                onClick={() => selectTrack(track)}
                className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition ${
                  isSelected 
                    ? (isDarkMode ? 'bg-red-500/20 text-red-300 border border-red-500/30' : 'bg-red-50 text-red-700 border border-red-200')
                    : (isDarkMode ? 'hover:bg-slate-800/60' : 'hover:bg-slate-200/60')
                }`}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <Music2 className={`w-4 h-4 shrink-0 ${isSelected ? 'text-red-400' : 'text-slate-400'}`} />
                  <div className="overflow-hidden">
                    <p className="text-xs font-medium truncate">{track.title}</p>
                    <p className="text-[10px] text-slate-400 truncate">{track.artist}</p>
                  </div>
                </div>
                {isSelected && isPlaying && (
                  <span className="text-[10px] text-red-400 font-mono animate-pulse">A tocar</span>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}