class PostController < ApplicationController

  before_action :authenticate_user

  def index
    @posts = Post.all.order(created_at: :desc)
    @comments = Comment.all.order(created_at: :asc)
  end

  def new
    @post = Post.new
  end

  def create
    @post = Post.new(
      content: params[:content],
      user_id: @current_user.id,
      image: params[:image]
    )

    if @post.save
      flash[:notice] = "Posted!"
      redirect_to("/posts/index")
    else
      render("posts/new")
    end

  end

  def edit
    @post = Post.find_by(id: params[:id])
  end

  def update
    @post = Post.find_by(id: params[:id])
    @post.content= params[:content]
    @post.image = params[:image]
    @post.save
    flash[:notice] = "Post was edited!"
    redirect_to("/posts/index")
  end

  def destroy
    @post = Post.find_by(id: params[:id])
    @post.destroy
    flash[:notice] = "Post was deleted!"
    redirect_to("/posts/index")
  end

  def image_params
    params.require(:image).permit(:name, :content, :image)
  end
end
