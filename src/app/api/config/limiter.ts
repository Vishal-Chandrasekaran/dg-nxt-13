import { RateLimiter } from "limiter";

//creating a nre instance and providing options for it 
export const limiter = new RateLimiter({
    tokensPerInterval: 3,
    interval: "min",
    fireImmediately:true,
});

