class Api::CompaniesController < ApplicationController
  before_action :set_company, only: [:destroy]
  skip_before_action :verify_authenticity_token

  def index
    @companies = current_user.assigned_companies
  end

  def show
    @company = Company.find(params[:id])
    @employees = @company.users
  end

  def destroy
    @company.destroy
  end

  def create
    @company = Company.new(company_params)
    if @company.save

      current_user.assigned_companies << @company.id
      current_user.save
      render json: @company
    else
    end
  end

  private
    def set_company
      @company = Company.find(params[:id])
    end

    def company_params
      params.require(:company).permit(:name)
    end
end
