
export interface BlogPost {
    No: number;
    url: string;
    title: string;
    regdate: string;
  }
  
  export interface Company {
    name: string;
    keyword: string;
    placeUrl: string;
    startDate: string;
    endDate: string;
    rank: number;
    rankChange: number;
    blog: {
      target: number;
      reported: number;
      posts: BlogPost[];
    };
    experience: {
      target: number;
      reported: number;
    };
  }