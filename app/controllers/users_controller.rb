class UsersController < ApplicationController

  before_action :authenticate_user, {only: [:index, :edit, :user_detail]}
  before_action :forbid_login_user, {only: [:new, :create, :login, :login_form]}

  def index
    @users= User.all.order(name: :desc).search(params[:search])
    gon.current_user = @current_user
  end

  def user_detail
    @user = User.find_by(id: params[:id])
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(
      name: params[:name],
      email: params[:email],
      password: params[:password],
      profile_image: params[:image]
    )


    if @user.save
    session[:user_id] = @user.id
    flash[:notice] = "Your account has been created!"
    redirect_to("/users/#{@user.id}/detail")
    else
    render("users/new")
    end
    
  end


  def edit
    @user = User.find_by(id: params[:id])
  end

  def update
    @user = User.find_by(id: params[:id])
    @user.name = params[:name]
    @user.profile_image = params[:image]
    @user.email = params[:email]

    if @user.save
      redirect_to("/users/#{@user.id}/detail")
    else
      render("/users/#{@user.id}/edit")
    end
    
  end


  def login_form
  end

  def login
    @user = User.find_by(email: params[:email])
    if @user && @user.authenticate(params[:password])
      session[:user_id] = @user.id

      flash[:notice] = "Login is successful"
      redirect_to("/posts/index")
    else
      @error_message = "Email Address or Password is wrong"
      @email = params[:email]
      @password = params[:password]
      render("users/login_form")
    end
  end

  def logout
    session[:user_id] = nil
    redirect_to("/")
  end

  def search
  @users = User.where('name LIKE(?)', "%#{params[:keyword]}%")
  render json: @users
end
  

end
