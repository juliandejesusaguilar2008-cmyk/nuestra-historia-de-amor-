import React, { useState } from 'react';
import { Settings, X, Save, RotateCcw, Copy, Check, Heart, Sparkles, Image as ImageIcon } from 'lucide-react';
import { LoveAppConfig } from '../types';
import { DEFAULT_CONFIG } from '../config';

interface CustomizerModalProps {
  config: LoveAppConfig;
  onUpdateConfig: (newConfig: LoveAppConfig) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  config,
  onUpdateConfig,
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState<LoveAppConfig>(config);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'nombres' | 'fotos' | 'carta' | 'cancion'>('nombres');

  if (!isOpen) return null;

  const handleSave = () => {
    onUpdateConfig(formData);
    localStorage.setItem('love_app_custom_config_v6', JSON.stringify(formData));
    onClose();
  };

  const handleReset = () => {
    if (window.confirm('¿Deseas restaurar la configuración inicial predeterminada?')) {
      setFormData(DEFAULT_CONFIG);
      onUpdateConfig(DEFAULT_CONFIG);
      localStorage.removeItem('love_app_custom_config_v6');
      localStorage.removeItem('love_app_custom_config_v5');
      localStorage.removeItem('love_app_custom_config_v4');
      localStorage.removeItem('love_app_custom_config_v3');
      localStorage.removeItem('love_app_custom_config_v2');
      localStorage.removeItem('love_app_custom_config');
    }
  };

  const handleCopyCode = () => {
    const code = `export const DEFAULT_CONFIG: LoveAppConfig = ${JSON.stringify(formData, null, 2)};`;
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Personalizador en vivo"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#f3c1cb] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Encabezado */}
        <div className="flex items-center justify-between p-4 sm:p-5 bg-[#faf6f3] border-b border-[#f3c1cb]/60">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#fce8ec] text-[#7a1c34] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#d9778a]" />
            </div>
            <div>
              <h3 className="font-serif-cormorant text-xl font-bold text-[#521323]">
                Personalizar página de regalo
              </h3>
              <p className="text-xs text-[#7a1c34]/70">
                Cambia nombres, fechas, fotos y mensajes en vivo
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full text-[#7a1c34] hover:bg-[#fce8ec] flex items-center justify-center transition-colors"
            aria-label="Cerrar personalizador"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pestañas de navegación interna */}
        <div className="flex border-b border-[#fce8ec] bg-white px-3 pt-2 gap-1 overflow-x-auto text-xs font-medium">
          <button
            onClick={() => setActiveTab('nombres')}
            className={`px-3 py-2 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'nombres'
                ? 'border-[#7a1c34] text-[#7a1c34] font-bold'
                : 'border-transparent text-gray-500 hover:text-[#7a1c34]'
            }`}
          >
            Nombres & Fechas
          </button>
          <button
            onClick={() => setActiveTab('fotos')}
            className={`px-3 py-2 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'fotos'
                ? 'border-[#7a1c34] text-[#7a1c34] font-bold'
                : 'border-transparent text-gray-500 hover:text-[#7a1c34]'
            }`}
          >
            Fotografías
          </button>
          <button
            onClick={() => setActiveTab('carta')}
            className={`px-3 py-2 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'carta'
                ? 'border-[#7a1c34] text-[#7a1c34] font-bold'
                : 'border-transparent text-gray-500 hover:text-[#7a1c34]'
            }`}
          >
            Mensajes & Carta
          </button>
          <button
            onClick={() => setActiveTab('cancion')}
            className={`px-3 py-2 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'cancion'
                ? 'border-[#7a1c34] text-[#7a1c34] font-bold'
                : 'border-transparent text-gray-500 hover:text-[#7a1c34]'
            }`}
          >
            Música
          </button>
        </div>

        {/* Contenido editable */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1 text-sm text-[#4a3439]">
          {activeTab === 'nombres' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#7a1c34] mb-1">
                  Nombre o apodo de tu novia:
                </label>
                <input
                  type="text"
                  value={formData.herName}
                  onChange={(e) => setFormData({ ...formData, herName: e.target.value })}
                  placeholder="Ej: Sofía, Mi Niña Bonita..."
                  className="w-full px-3.5 py-2 rounded-xl border border-[#f3c1cb] focus:border-[#7a1c34] focus:outline-none bg-[#faf6f3]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#7a1c34] mb-1">
                  Tu nombre o apodo:
                </label>
                <input
                  type="text"
                  value={formData.hisName}
                  onChange={(e) => setFormData({ ...formData, hisName: e.target.value })}
                  placeholder="Ej: Alejandro, Tu Amor..."
                  className="w-full px-3.5 py-2 rounded-xl border border-[#f3c1cb] focus:border-[#7a1c34] focus:outline-none bg-[#faf6f3]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#7a1c34] mb-1">
                    Fecha de inicio de novios (AAAA-MM-DD):
                  </label>
                  <input
                    type="date"
                    value={formData.relationshipStartDate}
                    onChange={(e) =>
                      setFormData({ ...formData, relationshipStartDate: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-[#f3c1cb] focus:border-[#7a1c34] focus:outline-none bg-[#faf6f3]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#7a1c34] mb-1">
                    Meses que celebran:
                  </label>
                  <input
                    type="number"
                    value={formData.anniversaryMonths}
                    onChange={(e) =>
                      setFormData({ ...formData, anniversaryMonths: parseInt(e.target.value) || 7 })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-[#f3c1cb] focus:border-[#7a1c34] focus:outline-none bg-[#faf6f3]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#7a1c34] mb-1">
                  Texto de cumpleaños en la pantalla inicial:
                </label>
                <input
                  type="text"
                  value={formData.hero.subheadline}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, subheadline: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-[#f3c1cb] focus:border-[#7a1c34] focus:outline-none bg-[#faf6f3]"
                />
              </div>
            </div>
          )}

          {activeTab === 'fotos' && (
            <div className="space-y-4">
              <p className="text-xs text-[#7a1c34]/80 bg-[#fce8ec] p-2.5 rounded-xl">
                💡 Puedes pegar enlaces directos de imágenes de la web o colocar tus fotos en la carpeta <code className="font-mono bg-white px-1 rounded">public/images/</code> y escribir <code className="font-mono bg-white px-1 rounded">/images/tu-foto.jpg</code>.
              </p>

              <div>
                <label className="block text-xs font-semibold text-[#7a1c34] mb-1">
                  Foto de la Pantalla Inicial / Portada:
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={formData.hero.photoUrl || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        hero: { ...formData.hero, photoUrl: e.target.value },
                      })
                    }
                    placeholder="https://... o /images/portada.jpg"
                    className="flex-1 px-3 py-2 rounded-xl border border-[#f3c1cb] focus:border-[#7a1c34] focus:outline-none bg-[#faf6f3]"
                  />
                  <label className="px-3.5 py-2 rounded-xl bg-[#7a1c34] hover:bg-[#601427] text-white text-xs font-medium cursor-pointer flex items-center gap-1.5 transition-colors shrink-0">
                    <span>Elegir archivo</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (ev) => {
                            const res = ev.target?.result as string;
                            if (res) {
                              setFormData({
                                ...formData,
                                hero: { ...formData.hero, photoUrl: res },
                              });
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#7a1c34] mb-1">
                  Pie de foto de la portada (opcional):
                </label>
                <input
                  type="text"
                  value={formData.hero.photoCaption || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, photoCaption: e.target.value },
                    })
                  }
                  placeholder="Ej: Nuestra historia de amor ✨"
                  className="w-full px-3 py-2 rounded-xl border border-[#f3c1cb] focus:border-[#7a1c34] focus:outline-none bg-[#faf6f3]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#7a1c34] mb-1">
                  Foto de la sección de Cumpleaños:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.birthday.photoUrl}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        birthday: { ...formData.birthday, photoUrl: e.target.value },
                      })
                    }
                    className="flex-1 px-3 py-2 rounded-xl border border-[#f3c1cb] focus:border-[#7a1c34] focus:outline-none bg-[#faf6f3]"
                  />
                  <label className="px-3.5 py-2 rounded-xl bg-[#7a1c34] hover:bg-[#601427] text-white text-xs font-medium cursor-pointer flex items-center gap-1.5 transition-colors shrink-0">
                    <span>Elegir archivo</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (ev) => {
                            const res = ev.target?.result as string;
                            if (res) {
                              setFormData({
                                ...formData,
                                birthday: { ...formData.birthday, photoUrl: res },
                              });
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#7a1c34] mb-1">
                  Foto principal de cierre (Final de la página):
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.closing.mainPhotoUrl}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        closing: { ...formData.closing, mainPhotoUrl: e.target.value },
                      })
                    }
                    className="flex-1 px-3 py-2 rounded-xl border border-[#f3c1cb] focus:border-[#7a1c34] focus:outline-none bg-[#faf6f3]"
                  />
                  <label className="px-3.5 py-2 rounded-xl bg-[#7a1c34] hover:bg-[#601427] text-white text-xs font-medium cursor-pointer flex items-center gap-1.5 transition-colors shrink-0">
                    <span>Elegir archivo</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (ev) => {
                            const res = ev.target?.result as string;
                            if (res) {
                              setFormData({
                                ...formData,
                                closing: { ...formData.closing, mainPhotoUrl: res },
                              });
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              <div className="pt-2">
                <label className="block text-xs font-semibold text-[#7a1c34] mb-2">
                  Fotos del Álbum / Galería:
                </label>
                <div className="space-y-2">
                  {formData.gallery.photos.map((photo, idx) => (
                    <div key={photo.id} className="flex items-center gap-2 bg-[#faf6f3] p-2 rounded-xl border border-[#f3c1cb]">
                      <img src={photo.url} alt="" className="w-10 h-10 object-cover rounded-lg shrink-0" />
                      <span className="text-xs truncate flex-1 text-[#7a1c34] font-medium">{photo.caption}</span>
                      <label className="px-2.5 py-1.5 rounded-lg bg-[#7a1c34] hover:bg-[#601427] text-white text-xs font-medium cursor-pointer shrink-0">
                        <span>Cambiar</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (ev) => {
                                const res = ev.target?.result as string;
                                if (res) {
                                  const updatedPhotos = [...formData.gallery.photos];
                                  updatedPhotos[idx] = { ...updatedPhotos[idx], url: res };
                                  setFormData({
                                    ...formData,
                                    gallery: { ...formData.gallery, photos: updatedPhotos },
                                  });
                                }
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'carta' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#7a1c34] mb-1">
                  Saludo de la carta:
                </label>
                <input
                  type="text"
                  value={formData.letter.salutation}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      letter: { ...formData.letter, salutation: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-[#f3c1cb] focus:border-[#7a1c34] focus:outline-none bg-[#faf6f3]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#7a1c34] mb-1">
                  Primer párrafo de tu carta personal:
                </label>
                <textarea
                  rows={3}
                  value={formData.letter.paragraphs[0] || ''}
                  onChange={(e) => {
                    const newPs = [...formData.letter.paragraphs];
                    newPs[0] = e.target.value;
                    setFormData({
                      ...formData,
                      letter: { ...formData.letter, paragraphs: newPs },
                    });
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-[#f3c1cb] focus:border-[#7a1c34] focus:outline-none bg-[#faf6f3]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#7a1c34] mb-1">
                  Segundo párrafo de tu carta:
                </label>
                <textarea
                  rows={3}
                  value={formData.letter.paragraphs[1] || ''}
                  onChange={(e) => {
                    const newPs = [...formData.letter.paragraphs];
                    newPs[1] = e.target.value;
                    setFormData({
                      ...formData,
                      letter: { ...formData.letter, paragraphs: newPs },
                    });
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-[#f3c1cb] focus:border-[#7a1c34] focus:outline-none bg-[#faf6f3]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#7a1c34] mb-1">
                  Firma final:
                </label>
                <input
                  type="text"
                  value={formData.letter.signature}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      letter: { ...formData.letter, signature: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-[#f3c1cb] focus:border-[#7a1c34] focus:outline-none bg-[#faf6f3]"
                />
              </div>
            </div>
          )}

          {activeTab === 'cancion' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#7a1c34] mb-1">
                  Canción principal de inicio:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={formData.music.title}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        music: { ...formData.music, title: e.target.value },
                      })
                    }
                    placeholder="Título"
                    className="w-full px-3 py-2 rounded-xl border border-[#f3c1cb] focus:border-[#7a1c34] focus:outline-none bg-[#faf6f3] text-xs"
                  />
                  <input
                    type="text"
                    value={formData.music.artist}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        music: { ...formData.music, artist: e.target.value },
                      })
                    }
                    placeholder="Artista"
                    className="w-full px-3 py-2 rounded-xl border border-[#f3c1cb] focus:border-[#7a1c34] focus:outline-none bg-[#faf6f3] text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#7a1c34] mb-1">
                  Playlist romántica (se reproduce en este orden y bucle infinito):
                </label>
                <div className="space-y-2 bg-[#fdf0f2] p-3 rounded-2xl border border-[#f3c1cb]">
                  {(formData.music.playlist || []).map((song, idx) => (
                    <div key={song.id || idx} className="flex items-center gap-2 bg-white p-2 rounded-xl border border-[#fce8ec] text-xs">
                      <span className="w-5 h-5 rounded-full bg-[#fce8ec] text-[#7a1c34] font-bold text-[10px] flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <div className="flex-1 truncate">
                        <p className="font-semibold text-[#521323] truncate">{song.title}</p>
                        <p className="text-[10px] text-[#7a1c34]/70 truncate">{song.artist}</p>
                      </div>
                      <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
                        Lista
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-[#7a1c34]/80 mt-2 flex items-center gap-1 font-medium">
                  🔁 Cuando una canción termina, salta automáticamente a la siguiente y al finalizar la última vuelve a empezar en bucle infinito.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Pie de acciones */}
        <div className="p-4 bg-[#faf6f3] border-t border-[#f3c1cb]/60 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              type="button"
              className="px-3 py-1.5 text-xs text-gray-500 hover:text-[#7a1c34] flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restaurar</span>
            </button>
            <button
              onClick={handleCopyCode}
              type="button"
              className="px-3 py-1.5 text-xs text-[#7a1c34] hover:bg-[#fce8ec] rounded-lg flex items-center gap-1 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? '¡Copiado!' : 'Copiar objeto para config.ts'}</span>
            </button>
          </div>

          <button
            onClick={handleSave}
            type="button"
            className="px-5 py-2 bg-[#7a1c34] hover:bg-[#601427] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Aplicar cambios</span>
          </button>
        </div>
      </div>
    </div>
  );
};
