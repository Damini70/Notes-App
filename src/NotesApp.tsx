import { useState } from "react"
import { Plus, Edit2, Trash2, X,Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge";
import { useSelector, useDispatch } from 'react-redux';
import { 
  addNote, 
  deleteNote, 
  updateNote, 
  addSubnote, 
  deleteSubnote, 
  updateSubnote,
} from './store/slices/noteSlice'
import type { RootState } from "./store/store"


interface SubNote {
  id: string
  title: string
  content: string
  createdAt: Date
}

interface Note {
  id: string
  title: string
  content: string
  subnotes: SubNote[]
  createdAt: Date
}

export default function NotesApp() {
      const dispatch = useDispatch()
  const notes = useSelector((state: RootState) => state.notes.notes)
  const [newNote, setNewNote] = useState({ title: "", content: "" })
  const [editingNote, setEditingNote] = useState<string | null>(null)
  const [editingSubnote, setEditingSubnote] = useState<string | null>(null)
  const [newSubnote, setNewSubnote] = useState<{ [key: string]: { title: string; content: string } }>({})
    const [searchQuery, setSearchQuery] = useState("");
   console.log({editingSubnote})

    const filteredNotes = notes.filter((note) => {
    const noteMatches =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())

    const subnoteMatches = note.subnotes.some(
      (subnote) =>
        subnote.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subnote.content.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    return noteMatches || subnoteMatches
  })

  const handleAddNote = () => {
    if (newNote.title.trim()) {
       dispatch(addNote({
        title:  newNote.title,
        content: newNote.content
      }))
      setNewNote({ title: "", content: "" })
    }
  }

  const handleDeleteNote = (noteId: string) => {
     dispatch(deleteNote(noteId))
  }

  const handleUpdateNote = (noteId: string, updatedNote: Partial<Note>) => {
    dispatch(updateNote({id:noteId,...updatedNote}));
    setEditingNote(null)
  }

  const handleAddSubnote = (noteId: string) => {
    const subnoteData = newSubnote[noteId]
    if (subnoteData?.title.trim()) 

   {  dispatch(addSubnote({noteId,title:subnoteData.title,content:subnoteData.content}))

      setNewSubnote({ ...newSubnote, [noteId]: { title: "", content: "" } })
    }
  }

  const handleDeleteSubNote = (noteId: string, subnoteId: string) => {
   dispatch(deleteSubnote({noteId,subnoteId}))
  }

  const handleUpdateSubNote = (noteId: string, subnoteId: string, update: Partial<SubNote>) => {
    dispatch(updateSubnote({
        noteId, subnoteId,
        update
        
    }))
   setEditingSubnote(null)
  }
  function highlightText(text: string, query: string) {
  if (!query.trim()) return text;

  const regex = new RegExp(`(${query})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="bg-yellow-200 text-black px-1 rounded">
        {part}
      </mark>
    ) : (
      part
    )
  );
}


  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Notes & Subnotes</h1>
          <p className="text-gray-600">Organize your thoughts with hierarchical notes</p>
        </div>

         {/* Search Section */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search notes and subnotes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            {searchQuery && (
              <p className="text-sm text-gray-600 mt-2">
                Found {filteredNotes.length} note{filteredNotes.length !== 1 ? "s" : ""} matching "{searchQuery}"
              </p>
            )}
          </CardContent>
        </Card>

        {/* Add New Note Form */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Create New Note
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Note title..."
              value={newNote.title}
              onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
            />
            <Textarea
              placeholder="Note content..."
              value={newNote.content}
              onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
              rows={3}
            />
            <Button onClick={handleAddNote} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Note
            </Button>
          </CardContent>
        </Card>

        {/* Notes List */}
        <div className="space-y-6">
          {notes.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <p className="text-gray-500 text-lg">No notes yet. Create your first note above!</p>
              </CardContent>
            </Card>
          ) : (
            notes.map((note) => (
              <Card key={note.id} className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {editingNote === note.id ? (
                        <div className="space-y-2">
                          <Input
                            defaultValue={note.title}
                            onChange={(e) => handleUpdateNote(note.id, { title: e.target.value })}
                            autoFocus
                          />
                          <Textarea
                            defaultValue={note.content}
                            onChange={(e) => handleUpdateNote(note.id, { content: e.target.value })}
                            rows={3}
                          />
                        </div>
                      ) : (
                        <div>
                       <CardTitle className="text-xl mb-2">
                          {highlightText(note.title, searchQuery)}
                       </CardTitle>
                        {note.content && (
  <p className="text-gray-600 whitespace-pre-wrap">
    {highlightText(note.content, searchQuery)}
  </p>
)}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Badge variant="secondary">{note.subnotes.length} subnotes</Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                            
                            setEditingNote(editingNote === note.id ? null : note.id)
                        }}
                      >
                        {editingNote === note.id ? <X className="h-4 w-4" /> : <Edit2 className="h-4 w-4" />}
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteNote(note.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  {/* Subnotes */}
                  <div className="space-y-3">
                    {note.subnotes.map((subnote) => (
                      <div key={subnote.id} className="bg-gray-50 rounded-lg p-4 border-l-2 border-l-gray-300">
                        {editingSubnote === subnote.id ? (
                          <div className="space-y-2">
                            <Input
                              defaultValue={subnote.title}
                              onChange={(e) => handleUpdateSubNote(note.id, subnote.id, { title: e.target.value })}
                              autoFocus
                            />
                            <Textarea
                              defaultValue={subnote.content}
                              onChange={(e) => handleUpdateSubNote(note.id, subnote.id, { content: e.target.value })}
                              rows={2}
                            />
                          </div>
                        ) : (
                          <div>
                            <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium text-gray-900">
  {highlightText(subnote.title, searchQuery)}
</h4>
                              <div className="flex items-center gap-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setEditingSubnote(editingSubnote === subnote.id ? null : subnote.id)}
                                >
                                  {editingSubnote === subnote.id ? (
                                    <X className="h-3 w-3" />
                                  ) : (
                                    <Edit2 className="h-3 w-3" />
                                  )}
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => handleDeleteSubNote(note.id, subnote.id)}>
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                            {subnote.content && (
  <p className="text-gray-600 text-sm whitespace-pre-wrap">
    {highlightText(subnote.content, searchQuery)}
  </p>
)}

                          </div>
                        )}
                      </div>
                    ))}

                    {/* Add Subnote Form */}
                    <div className="bg-blue-50 rounded-lg p-4 border-2 border-dashed border-blue-200">
                      <div className="space-y-3">
                        <Input
                          placeholder="Subnote title..."
                          value={newSubnote[note.id]?.title || ""}
                          onChange={(e) =>
                            setNewSubnote({
                              ...newSubnote,
                              [note.id]: {
                                ...newSubnote[note.id],
                                title: e.target.value,
                              },
                            })
                          }
                        />
                        <Textarea
                          placeholder="Subnote content..."
                          value={newSubnote[note.id]?.content || ""}
                          onChange={(e) =>
                            setNewSubnote({
                              ...newSubnote,
                              [note.id]: {
                                ...newSubnote[note.id],
                                content: e.target.value,
                              },
                            })
                          }
                          rows={2}
                        />
                        <Button onClick={() => handleAddSubnote(note.id)} size="sm" className="w-full">
                        {editingNote?<>{<>Edit Note</>}</>:<><Plus className="h-4 w-4 mr-2" />
                          Add Subnote</>
                        }</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

