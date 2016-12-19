class Api::InvitationsController < Devise::InvitationsController
  skip_before_action :verify_authenticity_token
  clear_respond_to
  respond_to :json

  def create
    new_user_id = JSON.parse(super)['id']
    user = User.find(new_user_id)
    user.company = Company.find(params[:company_id])
    user.save
  end

  def update
    raw_invitation_token = update_resource_params[:invitation_token]
    resource = accept_resource
    sign_in(resource_name, resource)
    redirect_to '/dashboard'
  end

  private
    def invite_params
      params.require(:user).permit(:email, :first_name, :last_name)
    end
end

