class Api::ShiftsController < ApplicationController
  def index
  end

  def show
  end

  def create
    @shift = Shift.new(shift_params)
    if @shift.save
      binding.pry
      render json: @shift
    else
    end
  end

  private

  def shift_params
    params.require(:shift).permit(:day, :start, :end, :company_id, :user_id, :schedule_templates_id)
  end
end
