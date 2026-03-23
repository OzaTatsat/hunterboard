import { useState } from 'react'
import PageWrapper from '../components/layout/PageWrapper'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import useLocalStorage from '../hooks/useLocalStorage'
import { Plus, Trash2, FileText } from 'lucide-react'

const emptyForm = { title: '', content: '' }

export default function Notes() {
  const [notes, setNotes]         = useLocalStorage('notes', [])
  const [selected, setSelected]   = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm]           = useState(emptyForm)

  const handleAdd = () => {
    if (!form.title.trim()) return
    const newNote = { ...form, id: Date.now() }
    setNotes([newNote, ...notes])
    setSelected(newNote)
    setForm(emptyForm)
    setShowModal(false)
  }

  const handleDelete = (id) => {
    setNotes(notes.filter((n) => n.id !== id))
    if (selected?.id === id) setSelected(null)
  }

  return (
    <PageWrapper title="Notes" description="Your private research notes and findings">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-slate-500">{notes.length} notes saved</p>
        <Button onClick={() => setShowModal(true)}>
          <span className="flex items-center gap-2"><Plus size={16} /> New Note</span>
        </Button>
      </div>

      {notes.length === 0 ? (
       
        <Card className="flex flex-col items-center justify-center py-20 text-center">
          <div className="bg-slate-100 text-slate-400 p-4 rounded-2xl mb-4">
            <FileText size={28} />
          </div>
          <p className="text-slate-700 font-medium">No notes yet</p>
          <p className="text-sm text-slate-400 mt-1">Create your first note to get started</p>
        </Card>
      ) : (
      
        <div className="grid grid-cols-3 gap-6">

          {/* Left — Note List */}
          <div className="col-span-1 flex flex-col gap-2">
            {notes.map((note) => (
              <div
                key={note.id}
                onClick={() => setSelected(note)}
                className={`p-4 rounded-2xl border cursor-pointer transition duration-200 ${
                  selected?.id === note.id
                    ? 'bg-indigo-50 border-indigo-200'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">{note.title}</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {new Date(note.id).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(note.id) }}
                    className="text-slate-300 hover:text-red-400 transition shrink-0"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                {note.content && (
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2">{note.content}</p>
                )}
              </div>
            ))}
          </div>

          {/* Right — Note Viewer */}
          <div className="col-span-2">
            {selected ? (
              <Card className="h-full min-h-64">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{selected.title}</h3>
                <p className="text-xs text-slate-400 mb-5">
                  {new Date(selected.id).toLocaleDateString('default', {
                    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                  })}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                  {selected.content || <span className="text-slate-300 italic">No content</span>}
                </p>
              </Card>
            ) : (
              <Card className="flex items-center justify-center min-h-64">
                <p className="text-sm text-slate-400">← Select a note to read it</p>
              </Card>
            )}
          </div>

        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-slate-900 mb-5">New Note</h3>

            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-medium text-slate-500 mb-1 block">Title</label>
                <input
                  type="text"
                  placeholder="e.g. Recon notes for example.com"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-500 mb-1 block">Content</label>
                <textarea
                  placeholder="Write your notes here..."
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  rows={6}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button onClick={handleAdd}>Save Note</Button>
              <Button variant="ghost" onClick={() => { setShowModal(false); setForm(emptyForm) }}>Cancel</Button>
            </div>
          </div>
        </div>
      )}

    </PageWrapper>
  )
}