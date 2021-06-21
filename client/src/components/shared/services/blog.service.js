import axios from "axios";

export class BlogService {
    static async create (blog) {
        try {
            await axios({
                method: `POST`,
                url: `http://localhost:5000/create`,
                data: { blog }
            });

            return;
        }
        catch (err) {
            throw new Error(`${err.response.statusText} - ${err.response.data.message}`);
        }
    }

    static async update (blog) {
      try {
          const response = await axios({
              method: `PUT`,
              url: `http://localhost:5000/update`,
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
            url: `https://weds-app.herokuapp.com/list`
          });

          return response.data.data.blogs;
        } catch (err) {
          throw new Error(`${err.response.statusText} - ${err.response.data.message}`);
        }
      }

      static async getBlogById (id) {
        try {
          const response = await axios({
            method: `GET`,
            url: `http://localhost:5000/getById`,
            params: {
              id: id
            }
          });

          return response.data.data.blog[0];
        } catch (err) {
          throw new Error(`${err.response.statusText} - ${err.response.data.message}`);
        }
      }

    static async deleteBlog (id) {
        try {
          await axios({
            method: `DELETE`,
            url: `http://localhost:5000/`,
            params: {
              id: id
            }
          });
    
          return;
        }
        catch (err) {
          throw new Error(`${err.response.statusText} - ${err.response.data.message}`);
        }
      }
}