class Api::ShiftsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @company = Company.find(params[:id])
    @shifts = @company.shifts
    render json: @shifts
  end

  def show
  end

  def create
    @shift = Shift.new(shift_params)
    if @shift.save
      render json: @shift
    else
    end
  end

  def update
    @shift = Shift.find(params[:id])
    if @shift.update(shift_params)
      render json: @shift
    else
    end
  end

  def destroy
    @shift = Shift.find(params[:id])
    @shift.destroy
    render json: @shift
  end

  private

  def shift_params
    params.require(:shift).permit(:day, :start, :end, :company_id, :user_id, :schedule_templates_id)
  end
end
