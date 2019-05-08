class User < ApplicationRecord
    has_many :active_relationships, foreign_key: "follower_id", class_name: "Relationship", dependent: :destroy
    has_many :following, through: :active_relationships, source: :following

    has_many :passive_relationships, class_name:  "Relationship", foreign_key: "following_id", dependent: :destroy
    has_many :followers, through: :passive_relationships, source: :follower

    mount_uploader :profile_image, UploadFileUploader

    validates:name, {presence: true}
    validates:email, {presence: true, uniqueness: true}
    validates:password, {presence: true}

    # ユーザーをフォローする
    def follow(other_user)
        following << other_user
    end
    
    # ユーザーをフォロー解除する
    def unfollow(other_user)
        active_relationships.find_by(following_id: other_user.id).destroy
    end
    
    # 現在のユーザーがフォローしてたらtrueを返す
    def following?(other_user)
        following.include?(other_user)
    end

end
