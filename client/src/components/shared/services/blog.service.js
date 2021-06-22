import axios from "axios";

export class BlogService {
    static async create (blog) {
        try {
            await axios({
                method: `POST`,
                url: `https://weds-app.herokuapp.com/create`,
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
              url: `https://weds-app.herokuapp.com/update`,
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
            url: `https://weds-app.herokuapp.com/getById`,
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
            url: `https://weds-app.herokuapp.com/`,
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