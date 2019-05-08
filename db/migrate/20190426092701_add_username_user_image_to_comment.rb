class AddUsernameUserImageToComment < ActiveRecord::Migration[5.2]
  def change
    add_column :comments, :user_name, :string
    add_column :comments, :user_image, :string
  end
end
