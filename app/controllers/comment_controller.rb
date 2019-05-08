class CommentController < ApplicationController
    def create
        @post = Post.find_by(id: params[:id])
        @comment = Comment.new(
            content: params[:content],
            post_id: params[:id],
            user_id: @current_user.id,
            user_name: @current_user.name,
            user_image: @current_user.profile_image,
        )

        if @comment.save
            respond_to do |format|
                format.html { redirect_to "/posts/index"}
                format.json
              end
        else
            render("/posts/index")
        end

    end

end
