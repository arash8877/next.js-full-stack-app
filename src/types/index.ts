interface Post {
    prompt: string;
    tag: string;
  }
  
  export interface FormTypes {
    type: string;
    post: Post;
    setPost: (post: Post) => void;
    submitting: boolean;
    handleSubmit: (e: React.FormEvent) => void;
  }
  