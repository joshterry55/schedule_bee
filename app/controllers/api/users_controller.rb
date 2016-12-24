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
      if(@user.role == 'admin')
        @user.assigned_companies << @user.company_id
        @user.save
      else
        @user.assigned_companies = []
        @user.save
      end
      render json: @user
    else
    end
  end

  def destroy
    @user = User.find(params[:id])
    @user.company_id = 1
    @user.save
    render json: @user
  end

  private

  def user_params
    params.require(:user).permit(
      :first_name, :last_name, :role,
      :title, :company_id, :phone
    )
  end

end
