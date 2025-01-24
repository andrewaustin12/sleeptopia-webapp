import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

/**
 * Tag Selector Component
 * 
 * A reusable component for selecting tags from a predefined list.
 * 
 * Features:
 * - Search functionality for filtering tags
 * - Random tag suggestions when no tags are selected
 * - Maximum tag limit (3 tags) - can be changed to any number
 * - Show/hide functionality for large tag lists
 * - Responsive design with flex-wrap layout
 * 
 * Usage:
 * ```tsx
 * <TagSelector
 *   selectedTags={selectedTags}
 *   onChange={(newTags) => setSelectedTags(newTags)}
 * />
 * ```
 * 
 * Props:
 * - selectedTags: string[] - Array of currently selected tag names
 * - onChange: (tags: string[]) => void - Callback function when tags change
 * 
 * Styling:
 * - Uses shadcn/ui Badge component
 * - Fully customizable through Tailwind classes
 * - Responsive and mobile-friendly
 * 
 */

const PRESET_TAGS = [
  // Request Types (shown first)
  "Feature", "Bug report", "Enhancement", "Idea", "Question",

  // ADD MORE TAGS HERE and the will be show in a random order after the first 5 tags then the show more button will show all the tags 
];

interface TagSelectorProps {
  selectedTags: string[];
  onChange: (tags: string[]) => void;
}

export function TagSelector({ selectedTags, onChange }: TagSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [randomSuggestions, setRandomSuggestions] = useState<string[]>([]);

  // Set random suggestions on client-side only
  useEffect(() => {
    const availableTags = PRESET_TAGS.filter(tag => !selectedTags.includes(tag));
    const shuffled = [...availableTags].sort(() => 0.5 - Math.random());
    setRandomSuggestions(shuffled.slice(0, 3));
  }, [selectedTags]);

  const addTag = (tag: string) => {
    if (!selectedTags.includes(tag) ) {
      onChange([tag]);
    }
  };

  // for more than one tag
  // const addTag = (tag: string) => {
  //   if (!selectedTags.includes(tag) && selectedTags.length < 3) {
  //     onChange([...selectedTags, tag]);
  //   }
  // };

  const removeTag = (tag: string) => {
    onChange(selectedTags.filter((t) => t !== tag));
  };

  const filteredTags = PRESET_TAGS.filter(tag => 
    tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <Input
          type="search"
          placeholder="Search tags..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
        {selectedTags.length === 0 && randomSuggestions.length > 0 && (
          <p className="text-sm text-muted-foreground">
            Try: {randomSuggestions.join(', ')}
          </p>
        )}
        {selectedTags.length >= 3 && (
          <p className="text-sm text-muted-foreground">
            Maximum of 3 tags reached
          </p>
        )}
      </div>

      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedTags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="cursor-pointer hover:bg-secondary/80"
              onClick={() => removeTag(tag)}
            >
              {tag} <span className="ml-1 text-muted-foreground">×</span>
            </Badge>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {(showAll ? filteredTags : filteredTags.slice(0, 5)).map((tag) => {
          const isSelected = selectedTags.includes(tag);
          return (
            <Badge
              key={tag}
              variant={isSelected ? "secondary" : "outline"}
              className={`cursor-pointer transition-all whitespace-nowrap ${
                isSelected 
                  ? "opacity-50 hover:opacity-100" 
                  : "hover:bg-secondary/50"
              }`}
              onClick={() => isSelected ? removeTag(tag) : addTag(tag)}
            >
              {tag}
            </Badge>
          )}
        )}
        {!searchQuery && filteredTags.length > 5 && (
          <Badge 
            variant="outline" 
            className="cursor-pointer hover:bg-secondary/50 whitespace-nowrap"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? '− Show Less' : `+${filteredTags.length - 5} more`}
          </Badge>
        )}
      </div>
    </div>
  );
}