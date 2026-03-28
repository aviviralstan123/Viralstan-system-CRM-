import { useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { industries as initialIndustries, services, Industry } from "@/lib/mock-data";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";

const emptyIndustry = {
  serviceId: "",
  title: "",
  content: "",
  metaTitle: "",
  metaDescription: "",
};

export default function IndustriesList() {
  const [industryList, setIndustryList] = useState<Industry[]>(initialIndustries);
  const [editing, setEditing] = useState<Industry | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(emptyIndustry);

  const handleEdit = (industry: Industry) => {
    setEditing(industry);
    setCreating(false);
    setForm({
      serviceId: industry.serviceId,
      title: industry.title,
      content: industry.content,
      metaTitle: industry.metaTitle,
      metaDescription: industry.metaDescription,
    });
  };

  const handleCreate = () => {
    setCreating(true);
    setEditing(null);
    setForm(emptyIndustry);
  };

  const handleCancel = () => {
    setCreating(false);
    setEditing(null);
    setForm(emptyIndustry);
  };

  const handleSave = () => {
    if (!form.serviceId) {
      toast.error("Please select a service");
      return;
    }
    if (!form.title.trim()) {
      toast.error("Title is required");
      return;
    }
    if (editing) {
      setIndustryList((prev) =>
        prev.map((i) => (i.id === editing.id ? { ...i, ...form } : i))
      );
      toast.success("Industry updated");
    } else {
      const newIndustry: Industry = {
        id: String(Date.now()),
        ...form,
      };
      setIndustryList((prev) => [...prev, newIndustry]);
      toast.success("Industry created");
    }
    handleCancel();
  };

  const handleDelete = (id: string) => {
    setIndustryList((prev) => prev.filter((i) => i.id !== id));
    toast.success("Industry deleted");
  };

  const showForm = creating || editing;

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader
        title="Industries"
        description="Manage industry-specific content and SEO configurations."
      />

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{industryList.length} industries configured</p>
        <Button className="gradient-primary text-primary-foreground border-0" onClick={handleCreate}>
          <Plus className="h-4 w-4 mr-1.5" /> Add Industry
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h3 className="text-lg font-semibold">{editing ? "Edit Industry" : "New Industry"}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-primary block">Linked Service *</label>
                <select
                  value={form.serviceId}
                  onChange={(e) => setForm({ ...form, serviceId: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="">Select service</option>
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-primary block">Industry Title *</label>
                <Input placeholder="Industry title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-primary block">Page Content</label>
              <Textarea placeholder="Content for the industry page" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="min-h-[120px]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-primary block">Meta Title</label>
                <Input placeholder="SEO Title" value={form.metaTitle} onChange={(e) => setForm({ ...form, metaTitle: e.target.value })} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-primary block">Meta Description</label>
                <Input placeholder="SEO Description" value={form.metaDescription} onChange={(e) => setForm({ ...form, metaDescription: e.target.value })} />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button className="gradient-primary text-primary-foreground border-0" onClick={handleSave}>
                {editing ? "Update Industry" : "Create Industry"}
              </Button>
              <Button variant="outline" onClick={handleCancel}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Table */}
      {industryList.length > 0 ? (
        <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Title</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Service</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {industryList.map((industry) => (
                <tr key={industry.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium">{industry.title}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {services.find((s) => s.id === industry.serviceId)?.name || "—"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(industry)} className="h-8 w-8 text-primary hover:bg-primary/10">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(industry.id)} className="h-8 w-8 text-destructive hover:bg-destructive/10">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !showForm && (
          <div className="text-center py-12 text-sm text-muted-foreground bg-muted/30 rounded-xl border-2 border-dashed">
            No industries configured. Click "Add Industry" to get started.
          </div>
        )
      )}
    </div>
  );
}
