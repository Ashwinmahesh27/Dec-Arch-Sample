export interface Story {
  id: string;
  kicker: string;
  headline: string;
  deck: string;
  readTime: string;
  location?: string;
  date: string;
  author: string;
  authorRole?: string;
  category: 'World' | 'U.S.' | 'Politics' | 'Business' | 'Opinion' | 'Tech' | 'Science' | 'Arts';
  image?: string;
  imageCaption?: string;
  imageCredit?: string;
  isLead?: boolean;
  isFree?: boolean;
  videoDuration?: string;
  content: {
    leadParagraph: string;
    paragraphs: string[];
    takeaways?: string[];
    pullQuote?: {
      quote: string;
      attribution: string;
    };
  };
}

export interface LiveUpdate {
  time: string;
  headline: string;
  summary: string;
}

export interface CrosswordCell {
  row: number;
  col: number;
  number?: number;
  solution: string;
  isBlocked: boolean;
}

export interface CrosswordClue {
  number: number;
  direction: 'across' | 'down';
  text: string;
}
