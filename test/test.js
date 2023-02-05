const mongoose = require("mongoose");
const User = require("../models/User.model.js");
const Blog = require("../models/Blog.model.js");

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server.js");
const { describe } = require("mocha");
const should = chai.should();

chai.use(chaiHttp);

describe("Testing", () => {
  describe("User Login", () => {
    it("it should login the user", (done) => {
      const user = { Email: "user@gmail.com", Password: "abc123" };
      chai
        .request(server)
        .post("/api/user/login")
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("success").eql(true);
          done();
        });
    });
  });
  describe("/POST BLOG", () => {
    it("it should create a blog with a title and description", (done) => {
      const blog = { Title: "book", Description: "Good book to read" };
      chai
        .request(server)
        .post("/api/blog/createblog")
        .send(blog)
        .set(
          "Authorization",
          "eyJhbGciOiJIUzI1NiJ9.dXNlckBnbWFpbC5jb20.185d_I8hePKnqa_3GvuO7fZajJHG1gozyxCYe-oEWP0"
        )
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("success").eql(true);
          done();
        });
    });
  });
  describe("/PUT/:BlogID", () => {
    it("It should update name of the blog with the given id", (done) => {
      const blog = new Blog({
        Title: "book",
        Description: "Good book to read",
      });
      blog.save((err, blog) => {
        chai
          .request(server)
          .put("/api/blog/updateBlog/" + blog.id)
          .set(
            "Authorization",
            "eyJhbGciOiJIUzI1NiJ9.dXNlckBnbWFpbC5jb20.185d_I8hePKnqa_3GvuO7fZajJHG1gozyxCYe-oEWP0"
          )
          .send({
            Title: "book_name_updated",
            Description: "Good book to read",
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property("success").eql(true);
            done();
          });
      });
    });
  });
  describe("/DELETE/:BlogID", () => {
    it("It should delete blog with the given id", (done) => {
      const blog = new Blog({
        Title: "book",
        Description: "Good book to read",
      });
      blog.save((err, blog) => {
        chai
          .request(server)
          .delete("/api/blog/deleteBlog/" + blog.id)
          .set(
            "Authorization",
            "eyJhbGciOiJIUzI1NiJ9.dXNlckBnbWFpbC5jb20.185d_I8hePKnqa_3GvuO7fZajJHG1gozyxCYe-oEWP0"
          )
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property("success").eql(true);
            done();
          });
      });
    });
  });
  describe("/GET BLOGS", () => {
    it("It should get all the blogs", (done) => {
      chai
        .request(server)
        .get("/api/blog/getblogs")
        .set(
          "Authorization",
          "eyJhbGciOiJIUzI1NiJ9.dXNlckBnbWFpbC5jb20.185d_I8hePKnqa_3GvuO7fZajJHG1gozyxCYe-oEWP0"
        )
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
  describe("User Logout", () => {
    it("it should logout the user", (done) => {
      chai
        .request(server)
        .put("/api/user/logout")
        .set(
          "Authorization",
          "eyJhbGciOiJIUzI1NiJ9.dXNlckBnbWFpbC5jb20.185d_I8hePKnqa_3GvuO7fZajJHG1gozyxCYe-oEWP0"
        )
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("success").eql(true);
          done();
        });
    });
  });
  describe("/POST BLOG", () => {
    it("it should create a blog with a title and description", (done) => {
      const blog = { Title: "book", Description: "Good book to read" };
      chai
        .request(server)
        .post("/api/blog/createblog")
        .send(blog)
        .set(
          "Authorization",
          "eyJhbGciOiJIUzI1NiJ9.dXNlckBnbWFpbC5jb20.185d_I8hePKnqa_3GvuO7fZajJHG1gozyxCYe-oEWP0"
        )
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("success").eql(true);
          done();
        });
    });
  });
  describe("/PUT/:BlogID", () => {
    it("It should update name of the blog with the given id", (done) => {
      const blog = new Blog({
        Title: "book",
        Description: "Good book to read",
      });
      blog.save((err, blog) => {
        chai
          .request(server)
          .put("/api/blog/updateBlog/" + blog.id)
          .set(
            "Authorization",
            "eyJhbGciOiJIUzI1NiJ9.dXNlckBnbWFpbC5jb20.185d_I8hePKnqa_3GvuO7fZajJHG1gozyxCYe-oEWP0"
          )
          .send({
            Title: "book_name_updated",
            Description: "Good book to read",
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property("success").eql(true);
            done();
          });
      });
    });
  });
  describe("/DELETE/:BlogID", () => {
    it("It should delete blog with the given id", (done) => {
      const blog = new Blog({
        Title: "book",
        Description: "Good book to read",
      });
      blog.save((err, blog) => {
        chai
          .request(server)
          .delete("/api/blog/deleteBlog/" + blog.id)
          .set(
            "Authorization",
            "eyJhbGciOiJIUzI1NiJ9.dXNlckBnbWFpbC5jb20.185d_I8hePKnqa_3GvuO7fZajJHG1gozyxCYe-oEWP0"
          )
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property("success").eql(true);
            done();
          });
      });
    });
  });
  describe("/GET BLOGS", () => {
    it("It should get all the blogs", (done) => {
      chai
        .request(server)
        .get("/api/blog/getblogs")
        .set(
          "Authorization",
          "eyJhbGciOiJIUzI1NiJ9.dXNlckBnbWFpbC5jb20.185d_I8hePKnqa_3GvuO7fZajJHG1gozyxCYe-oEWP0"
        )
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
