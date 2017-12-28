// add comment function
const REMOVE_BUTTON_HTML = "<button class='btn btn-default remove' type='button'>Remove Post</button>";

const COMMENT_DIV = "<div class='comment-box'></div>";

const COMMENTS_NAME = "<span class='comments-name'></span>";
const COMMENTS_CONTENT = "<span class='comments-text'></span>";
const REMOVE_COMMENT = "<a class='remove'>Remove</a>";

const COMMENT_INPUT = '<input type="text" class="form-control comment-content" placeholder="Your Comment">';

const COMMENT_USER = '<input type="text" class="form-control comment-user" placeholder="name">';

const ROW = "<DIV class='row'></DIV>";

const COMMENT_BUTTON = "<button class='btn btn-default comment-btn' type='button'>Post Comment</button>";


// Our post object class with a running id
let nextId = 1;
function Post(text) {
    this.id = nextId++;
    this.text = text;
    // a comment array
    this.comments = [];
    this.addComment = function (name, comment) {
        this.comments.push({"name": name, "comment": comment});
    }

}

posts = [];
function onCreatePostClick() {
    createPost();
    render();


}
function createPost() {
    let post = $('#post-name');
    posts.push(new Post(post.val()));
    post.val("");

}
function addCommentClicked(i) {
    posts[i].addComment($(this).siblings(".comment-user").val(), $(this).siblings(".comment-content").val());
    render();

}

function removePost() {
    posts.splice($(this).closest('.post').data().arrayIndex, 1);
    render();
}

function removeComment(i, comment_i) {
    posts[i].comments.splice(comment_i, 1);
    render();
}

function buildComments(i, commentBox) {
    for (let comment_i = 0; comment_i < posts[i].comments.length; comment_i++) {
        let name = $(COMMENTS_NAME).append(posts[i].comments[comment_i].name);
        let comment = $(COMMENTS_CONTENT).append(posts[i].comments[comment_i].comment);

        let remove = $(REMOVE_COMMENT).click(function () {
            removeComment(i, comment_i)
        });

        let row = $(ROW).append(name).append(comment).append(remove);
        commentBox.append(row);
    }
    // return {comment_i, name, comment, remove, row};
}

function render() {

    let postsDiv = $('.posts');
    postsDiv.empty();

    for (let i = posts.length-1; i >= 0 ; i--) {
        // create post <p>
        let post = $("<p class='post' data-id='" + posts[i].id + "'>" + posts[i].text + "</p>");
        post.data('arrayIndex',i);

        // create Remove post button
        let removeButton = $(REMOVE_BUTTON_HTML);

        // on click remove from array and render again.

        removeButton.click(removePost);

        let commentButton = $(COMMENT_BUTTON);
        // assign add comment listener
        commentButton.click(addCommentClicked);

        let commentBox = $(COMMENT_DIV);
        buildComments(i, commentBox);


        // append button to post
        // append post to all posts div


        post.append(removeButton).append(ROW).append(commentBox);
        postsDiv.append(post);
        postsDiv.append($(ROW).append(COMMENT_USER).append(COMMENT_INPUT).append(commentButton));

    }
}

// add listenr to the add post button click event
$('.add-post').click(onCreatePostClick);
