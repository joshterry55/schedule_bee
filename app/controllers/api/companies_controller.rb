class Api::CompaniesController < ApplicationController
  before_action :set_company, only: [:destroy]
  skip_before_action :verify_authenticity_token

  def index
    current_user.assigned_companies.each do |x|
      if x == 1
        current_user.assigned_companies.delete(x)
        current_user.save
      end
    end
    @companies = current_user.assigned_companies

  end

  def show
    @company = Company.find(params[:id])
    @employees = @company.users
  end

  def destroy
    if @company.id == 1
      current_user.assigned_companies.delete(1)
    else
      current_user.assigned_companies.delete(@company.id)
      current_user.save
      @company.destroy
      render json: @company
    end

  end

  def create
    @company = Company.new(company_params)
    if @company.save

      current_user.assigned_companies << @company.id
      current_user.assigned_companies.each do |x|
        if x == 1
          current_user.assigned_companies.delete(x)
        end
      end
      current_user.save
      render json: @company
    else
    end
  end

  def edit
    @company = Company.find(params[:id])
  end

  def update
    @company = Company.find(params[:id])
    if @company.update(company_params)
      # current_user.assigned_companies << @company.id
      # current_user.save
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
