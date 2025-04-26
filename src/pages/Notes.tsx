
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Tables } from "@/integrations/supabase/types";

type Note = {
  id: number;
  title: string;
  content: string;
  user_id: string;
  created_at: string;
  updated_at: string;
};

const Notes = () => {
  const { user, loading } = useSupabaseAuth();
  const { toast } = useToast();
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [loadingNotes, setLoadingNotes] = useState(true);

  // Fetch notes for user
  useEffect(() => {
    if (!user || loading) {
      setNotes([]);
      setLoadingNotes(false);
      return;
    }
    setLoadingNotes(true);

    supabase
      .from("notes")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          toast({ title: "Error loading notes", description: error.message });
          setNotes([]);
        } else if (data) {
          setNotes(data as Note[]);
        }
        setLoadingNotes(false);
      });
  }, [user, loading, toast]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast({ title: "Note must have a title" });
      return;
    }

    if (!user) {
      toast({ title: "You must be logged in to create notes" });
      return;
    }

    setSaving(true);

    // Fix: Create the insert object without referencing Tables["Insert"]
    const insertObj = {
      title,
      content,
      user_id: user.id,
    };

    const { data, error } = await supabase
      .from("notes")
      .insert([insertObj])
      .select();

    setSaving(false);

    if (error) {
      toast({ title: "Failed to add note", description: error.message });
    } else if (data && data.length > 0) {
      const newNote = data[0] as Note;
      setNotes([newNote, ...notes]);
      setTitle("");
      setContent("");
      toast({ title: "Note added!" });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-muted">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center">
          <div className="bg-white p-8 rounded shadow">
            <h2 className="text-2xl font-bold mb-2">Notes</h2>
            <div className="text-center">
              <a className="text-primary underline" href="/auth">Sign in to access your notes</a>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Your Notes</h1>
        <form
          onSubmit={handleCreate}
          className="bg-white rounded-lg shadow p-6 mb-8 max-w-xl mx-auto space-y-4"
        >
          <div>
            <label className="block font-medium mb-1" htmlFor="note-title">
              Title
            </label>
            <Input
              id="note-title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              disabled={saving}
              placeholder="Note title"
            />
          </div>
          <div>
            <label className="block font-medium mb-1" htmlFor="note-content">
              Content
            </label>
            <Textarea
              id="note-content"
              value={content}
              onChange={e => setContent(e.target.value)}
              disabled={saving}
              placeholder="Type your note here..."
              rows={4}
            />
          </div>
          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Add Note"}
          </Button>
        </form>

        <div className="max-w-2xl mx-auto space-y-4">
          {loadingNotes ? (
            <div className="text-center text-muted-foreground py-12">Loading notes...</div>
          ) : notes.length === 0 ? (
            <div className="text-center text-muted-foreground py-12">No notes yet.</div>
          ) : (
            notes.map(note => (
              <div key={note.id} className="border rounded-lg bg-muted p-4 shadow">
                <h2 className="font-semibold text-lg mb-1">{note.title}</h2>
                <p className="mb-2 whitespace-pre-wrap">{note.content}</p>
                <div className="text-xs text-muted-foreground">
                  {new Date(note.created_at).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Notes;
