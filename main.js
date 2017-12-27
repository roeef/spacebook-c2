// Out post object class with a running id
var nextId = 1;
function Post(text) {
        this.id = nextId++;
        this.text = text;
    };

posts=[];

function createPost() {
    let post = $('#post-name');
    posts.push(new Post(post.val()));
    post.val("");
}

const REMOVE_BUTTON_HTML ="<button class='btn btn-primary remove' type='button'>Remove</button>";
const COMMENT_DIV = "<div class='comment-box'></div>";
const COMMENT_INPUT = '<input type="text" class="form-control comment-content" placeholder="Comment">';
const COMMENT_USER = '<input type="text" class="form-control comment-user" placeholder="userName">';
const NEW_LINE ="<BR>";
const COMMENT_BUTTON = "<button class='btn btn-primary comment' type='button'>Comment</button>";
function render() {
    let postsDiv = $('.posts');
    postsDiv.empty();

    for (let i = 0; i<posts.length; i++) {
        // create post <p>
        let post = $("<p class='post' data-id='"+posts[i].id+"'>"+ posts[i].text +"</p>");
        // create button
        let removeButton = $(REMOVE_BUTTON_HTML);
        let userName = $(COMMENT_USER);
        let commentBox = $(COMMENT_DIV).append(userName).append(COMMENT_INPUT).append(COMMENT_BUTTON);
        // append button to post
        post.append(removeButton).append(NEW_LINE).append(commentBox);
        // append post to all posts div
        postsDiv.append(post);

        // on click remove from array and render again.
        removeButton.click(function(){
            posts.splice(i,1);
            render();
        })
    }
}

function onCreatePostClick() {
    createPost();
    render();
}

$('.add-post').click(onCreatePostClick);
