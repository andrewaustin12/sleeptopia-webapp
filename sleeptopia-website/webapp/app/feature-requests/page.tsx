"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Sparkles, ChevronUp } from "lucide-react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from "@clerk/nextjs";
import config from "@/config";
import Footer from "@/components/footer";
import { TagSelector } from "@/components/tag-selector";
import { Badge } from "@/components/ui/badge";

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'bg-slate-100 dark:bg-slate-800/50';
    case 'planned':
      return 'bg-blue-100 dark:bg-blue-950/50';
    case 'in-progress':
      return 'bg-purple-100 dark:bg-purple-950/50';
    case 'completed':
      return 'bg-green-100 dark:bg-green-950/50';
    case 'declined':
      return 'bg-red-100 dark:bg-red-950/50';
    default:
      return 'bg-muted';
  }
};

const getStatusTextColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'text-slate-700 dark:text-slate-300';
    case 'planned':
      return 'text-blue-700 dark:text-blue-400';
    case 'in-progress':
      return 'text-purple-700 dark:text-purple-400';
    case 'completed':
      return 'text-green-700 dark:text-green-400';
    case 'declined':
      return 'text-red-700 dark:text-red-400';
    default:
      return 'text-muted-foreground';
  }
};

export default function FeatureRequestPage() {
  const [request, setRequest] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sortByVotes, setSortByVotes] = useState(false);
  
  const features = useQuery(api.featureRequests.getAll) ?? [];
  const createFeature = useMutation(api.featureRequests.create);
  const toggleVote = useMutation(api.featureRequests.toggleVote);

  const { isSignedIn } = useAuth();

  const sortedFeatures = [...features].sort((a, b) => 
    sortByVotes ? (b.voteCount - a.voteCount) : (b.createdAt - a.createdAt)
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isSignedIn) {
      toast({
        title: "Please sign in to submit a feature request",
        variant: "destructive",
      });
      return;
    }

    if (!request.trim()) {
      toast({
        title: "Please enter a feature request",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await createFeature({ 
        request: request.trim(),
        tags: selectedTags
      });
      toast({
        title: "Feature request submitted successfully!",
        variant: "default",
      });
      setRequest("");
      setSelectedTags([]);
    } catch (error) {
      toast({
        title: "Failed to submit feature request",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVote = async (featureId: Id<"featureRequests">) => {
    if (!isSignedIn) {
      toast({
        title: "Please sign in to vote",
        variant: "destructive",
      });
      return;
    }

    try {
      await toggleVote({ id: featureId });
    } catch (error) {
      toast({
        title: "Failed to vote",
        variant: "destructive",
      });
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container max-w-screen-2xl mx-auto pl-6 pr-4 sm:px-6 lg:px-8 py-12 pb-24">
        <div className="flex items-center gap-3 mb-3">
        <Sparkles className="h-6 w-6" style={{ color: config.theme.colors.primary }} />
        <h1 className="text-2xl font-semibold">Feature Requests</h1>
      </div>
      <p className="text-muted-foreground text-lg mb-10 max-w-xl leading-relaxed">
        Help shape the future of {config.appName} by suggesting and voting on features.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Left Column */}
        <div className="lg:sticky lg:top-10 h-fit space-y-6">
          <Card className="p-8">
            <h2 className="text-xl font-semibold mb-3">Suggest a New Feature</h2>
            <p className="text-muted-foreground mb-6">
              Have an idea that could make {config.appName} even better? We&apos;re all ears!
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <Textarea
                value={request}
                onChange={(e) => setRequest(e.target.value)}
                placeholder="I would love to see..."
                className="min-h-[180px] text-lg resize-none p-4 "
                
              />
              
              <div className="space-y-3">
                <label className="text-sm font-medium">
                  Add tags
                </label>
                <TagSelector
                  selectedTags={selectedTags}
                  onChange={setSelectedTags}
                />
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting || !isSignedIn}
                size="lg"
                className="w-full text-base h-12"
                style={{ backgroundColor: config.theme.colors.primary }}
              >
                {!isSignedIn 
                  ? "Sign in to Submit →"
                  : isSubmitting 
                    ? "Submitting..." 
                    : "Submit Feature Request →"
                }
              </Button>
            </form>
          </Card>
          <div className="bg-blue-500/10 border-blue-500/20 rounded-lg p-4">
            <p className="text-sm text-muted-foreground">
              💡 Tip: Be specific in your feature request. The more details you provide, 
              the better we can understand and implement your suggestion.
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Community Requests</h2>
            {sortedFeatures.length > 0 && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setSortByVotes(!sortByVotes)}
              >
                {sortByVotes ? "Most Recent" : "Most Voted"}
              </Button>
            )}
          </div>
          
          {sortedFeatures.length === 0 ? (
            <Card className="p-8 flex flex-col items-center justify-center text-center">
              <div className="mb-4">
                <Sparkles className="h-12 w-12 text-muted-foreground/30" style={{ color: config.theme.colors.primary }} />
              </div>
              <h3 className="text-lg font-medium mb-2">No feature requests yet</h3>
              <p className="text-muted-foreground max-w-sm">
                Be the first to suggest a new feature! Share your ideas to help make ScreenFast even better.
              </p>
            </Card>
          ) : (
            <div className="space-y-6">
              {sortedFeatures.map((feature) => (
                <Card 
                  key={feature._id} 
                  className="p-6 transition-all duration-200 hover:shadow-md"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-2">
                        <p className="text-lg font-medium leading-snug text-foreground flex-1">
                          {feature.request}
                        </p>
                        {feature.status && (
                          <span 
                            className={`text-xs font-medium px-2.5 py-1 rounded-full ${getStatusColor(feature.status)} ${getStatusTextColor(feature.status)} mt-1`}
                          >
                            {feature.status}
                          </span>
                        )}
                      </div>
                      
                      {feature.tags && feature.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-2">
                          {feature.tags.map((tag: string) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-3">
                        {feature.voted === true && (
                          <span 
                            className="text-xs font-medium px-2.5 py-1 rounded-full"
                            style={{ 
                              backgroundColor: `${config.theme.colors.primary}20`,
                              color: config.theme.colors.primary 
                            }}
                          >
                            Voted
                          </span>
                        )}
                        <time className="text-sm text-muted-foreground">
                          {formatDistanceToNow(new Date(feature.createdAt), { addSuffix: true })}
                        </time>
                      </div>

                      {feature.adminNote && (
                        <div className="mt-3 p-3 bg-blue-500/10 rounded-md">
                          <p className="text-sm text-muted-foreground">
                            <span className="font-medium">Admin Note:</span> {feature.adminNote}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col items-center gap-1">
                      <Button
                        variant="ghost"
                        onClick={() => handleVote(feature._id)}
                        className={`
                          px-2 h-auto
                          flex flex-col items-center gap-1
                          hover:bg-transparent
                          ${feature.voted ? 'text-primary' : 'text-muted-foreground hover:text-primary'}
                        `}
                      >
                        <ChevronUp 
                          className="h-6 w-6 transition-colors"
                          style={{ color: feature.voted ? config.theme.colors.primary : undefined }}
                          strokeWidth={3}
                        />
                        <span className="text-md font-medium">
                          {feature.voteCount || 0}
                        </span>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
