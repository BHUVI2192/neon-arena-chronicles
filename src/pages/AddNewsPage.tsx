
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { categories } from "@/lib/data-service";
import { ArrowLeft, Save, Lock } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addNewsArticle } from "@/services/mongoService";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  category: z.string().min(1, "Category is required"),
  excerpt: z.string().optional(),
  imageurl: z.string().url("Invalid URL").min(1, "Image URL is required"),
  content: z.string().min(1, "Content is required"),
  source: z.string().min(1, "Source is required"),
});

type FormValues = z.infer<typeof formSchema>;

const AddNewsPage = () => {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check if user has editor permissions
    const savedAccessCode = localStorage.getItem("news_access_code");
    const AUTHORIZED_EDITORS = ["admin123", "editor456", "bharat789"];
    
    if (savedAccessCode && AUTHORIZED_EDITORS.includes(savedAccessCode)) {
      setIsAuthorized(true);
    } else {
      toast.error("You don't have permission to add news");
      navigate("/news");
    }
    
    setIsChecking(false);
  }, [navigate]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: categories[0]?.id || "",
      excerpt: "",
      imageurl: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
      content: "",
      source: "Bharat eSports",
    }
  });

  const onSubmit = async (data: FormValues) => {
    try {
      console.log("Submitting news article to MongoDB:", data);
      
      // Insert the news article into MongoDB
      await addNewsArticle({
        title: data.title,
        category: data.category,
        description: data.content,
        imageurl: data.imageurl,
        source: data.source,
        // Set date to current timestamp
        date: new Date().toISOString(),
        // Set isverified to true so it shows up immediately
        isverified: true
      });
      
      // Show success message
      toast("News article added successfully!");
      
      // Navigate back to news page
      navigate("/news");
    } catch (error: any) {
      console.error("Error adding news article:", error);
      toast("Failed to add news article: " + (error.message || "Unknown error"));
    }
  };

  if (isChecking) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Checking permissions...</p>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="max-w-md mx-auto p-8 border rounded-lg">
          <Lock className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h1 className="text-2xl font-bold mb-4">Access Restricted</h1>
          <p className="mb-6">You don't have permission to access this page.</p>
          <Button onClick={() => navigate("/news")}>Back to News</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Add News Article</h1>
        <Button variant="outline" onClick={() => navigate("/news")}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to News
        </Button>
      </div>

      <div className="max-w-3xl mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter article title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <select
                      className="w-full p-2 border rounded-md bg-background"
                      {...field}
                    >
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Excerpt/Summary</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Brief summary of the article"
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageurl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="URL for article image" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="source"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Source</FormLabel>
                  <FormControl>
                    <Input placeholder="Source of the article" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Article Content</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Full article content"
                      className="min-h-[300px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit" className="bg-esports-blue hover:bg-esports-blue/90">
                <Save className="h-4 w-4 mr-2" /> Save Article
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddNewsPage;
