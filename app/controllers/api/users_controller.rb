class Api::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def info
    unless current_user
      render json: {}
    end
  end

  def index
    @company = Company.find(params[:id])
    @employees = @company.users
    render json: @employees
  end

  def show
    @user = User.find(params[:id])
    render json: @user
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      binding.pry
      render json: @user
    else
    end
  end

  private

  def user_params
    params.require(:user).permit(
      :first_name, :last_name, :role,
      :title
    )
  end

end
