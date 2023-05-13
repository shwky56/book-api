
import { Controller, status } from "../../framework/index.js";
import  Search  from "../models.js";



class SearchController extends Controller {
    constructor() {
        super(Search);
    }
    
    async filter(req, res){
        try {
            const searchQuery = await req.query;
            const keys = Object.keys(searchQuery)
            
            if(searchQuery["user_id"])
                searchQuery["user_id"] = parseInt(searchQuery["user_id"])
            const search = await this.Model.find(searchQuery);
            if(!search[0]){
                res.status(status.HTTP_404_NOT_FOUND).json({ massage: `no search for user ${searchQuery["user_id"]}`});
            }
            else{
                res.status(status.HTTP_200_OK).json(search)
            }
        } catch (err) {
            res.send(err.message)
        }
    }
}
export default new SearchController();
