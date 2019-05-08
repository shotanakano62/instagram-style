# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# ユーザー
User.create!(name:  "Example User",
             email: "example@railschallenge.com",
             password:              "foobar")

99.times do |n|
  name  = Faker::Name.name
  email = "example-#{n+1}@railschallenge.com"
  password = "password"
  User.create!(name:  name,
               email: email,
               password: password)
end

# リレーションシップ
users = User.all
user  = users.first
following = users[2..50]
followers = users[3..40]
following.each { |following| user.follow(following) }
followers.each { |follower| follower.follow(user) }