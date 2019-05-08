class Post < ApplicationRecord
    mount_uploader :image, UploadFileUploader
    validates :user_id, {presence: true}
    
    def user
        return User.find_by(id: self.user_id)
    end
    
    def comment
        return Comment.find_by(post_id: self.id)
    end

    def comments_count
        return Comment.where(post_id: self.id).count
    end

end
