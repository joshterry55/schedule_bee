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



end
