class Comment < ApplicationRecord
    validates :content, {presence: true}
    validates :user_id, {presence: true}
    validates :post_id, {presence: true}
    validates :user_name, {presence: true}
    validates :user_image, {presence: true}

    def user
        return User.find_by(id: self.user_id)
    end
    
end
