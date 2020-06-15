

    export interface Day {
        day: number;
        amount: number;
        
    }

    export interface Weather {
        request: string;
        days: Day[];
        status:string;
    }

   