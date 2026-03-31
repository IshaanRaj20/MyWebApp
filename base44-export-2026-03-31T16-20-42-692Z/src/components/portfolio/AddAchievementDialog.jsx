const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Upload, Loader2 } from "lucide-react";

export default function AddAchievementDialog({ onAdd }) {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "award",
    date_earned: "",
    image_url: "",
    download_url: "",
  });

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const { file_url } = await db.integrations.Core.UploadFile({ file });
    setForm(prev => ({ ...prev, image_url: file_url }));
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title) return;
    setSaving(true);
    const data = { ...form };
    if (!data.date_earned) delete data.date_earned;
    if (!data.image_url) delete data.image_url;
    if (!data.description) delete data.description;
    if (!data.download_url) delete data.download_url;
    await db.entities.Achievement.create(data);
    onAdd();
    setForm({ title: "", description: "", category: "award", date_earned: "", image_url: "", download_url: "" });
    setSaving(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90 font-body rounded-full px-6 shadow-lg">
          <Plus className="w-5 h-5 mr-2" />
          Add Achievement
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl">Add New Achievement 🏆</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div>
            <Label className="font-body text-sm">Title *</Label>
            <Input
              value={form.title}
              onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
              placeholder="e.g. Science Fair 1st Place"
              className="mt-1 font-body"
            />
          </div>
          <div>
            <Label className="font-body text-sm">Description</Label>
            <Textarea
              value={form.description}
              onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Tell us about this achievement..."
              className="mt-1 font-body h-20"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="font-body text-sm">Category</Label>
              <Select value={form.category} onValueChange={(v) => setForm(prev => ({ ...prev, category: v }))}>
                <SelectTrigger className="mt-1 font-body">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="award">🏅 Award</SelectItem>
                  <SelectItem value="trophy">🏆 Trophy</SelectItem>
                  <SelectItem value="accomplishment">⭐ Accomplishment</SelectItem>
                  <SelectItem value="game">🎮 Game</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="font-body text-sm">Date Earned</Label>
              <Input
                type="date"
                value={form.date_earned}
                onChange={(e) => setForm(prev => ({ ...prev, date_earned: e.target.value }))}
                className="mt-1 font-body"
              />
            </div>
          </div>
          {form.category === "game" && (
            <div>
              <Label className="font-body text-sm">Download Link</Label>
              <Input
                value={form.download_url}
                onChange={(e) => setForm(prev => ({ ...prev, download_url: e.target.value }))}
                placeholder="https://..."
                className="mt-1 font-body"
              />
            </div>
          )}
          <div>
            <Label className="font-body text-sm">Photo</Label>
            <div className="mt-1">
              {form.image_url ? (
                <div className="relative rounded-lg overflow-hidden h-32">
                  <img src={form.image_url} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setForm(prev => ({ ...prev, image_url: "" }))}
                    className="absolute top-2 right-2 bg-black/50 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <label className="flex items-center justify-center gap-2 border-2 border-dashed border-border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                  {uploading ? (
                    <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                  ) : (
                    <>
                      <Upload className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground font-body">Upload a photo</span>
                    </>
                  )}
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              )}
            </div>
          </div>
          <Button type="submit" disabled={saving || !form.title} className="w-full rounded-full font-body">
            {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            {saving ? "Saving..." : "Add to My Portfolio"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}