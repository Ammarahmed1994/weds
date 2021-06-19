import axios from "axios";

export class BlogService {
    static async create (blog) {
        try {
            await axios({
                method: `POST`,
                url: `/api/blog/create`,
                data: { blog }
            });

            return;
        }
        catch (err) {
            throw new Error(`${err.response.statusText} - ${err.response.data.message}`);
        }
    }

    static async getBlogList () {
        try {
          const response = await axios({
            method: `GET`,
            url: `http://localhost:5000/list`
          });

          return response.data.data.blogs;
        } catch (err) {
          throw new Error(`${err.response.statusText} - ${err.response.data.message}`);
        }
      }

    static async deleteBlog (id) {
        try {
          await axios({
            method: `DELETE`,
            url: `/api/blog/${ id }`
          });
    
          return;
        }
        catch (err) {
          throw new Error(`${err.response.statusText} - ${err.response.data.message}`);
        }
      }
}