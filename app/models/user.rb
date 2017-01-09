class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :invitable, :registerable, :recoverable, :rememberable, :trackable, :validatable
  belongs_to :company
  has_many :shifts, dependent: :destroy

  validates_presence_of :first_name, :last_name
  validates_inclusion_of :role, in: %w(admin manager employee)

  def block_from_invitation?
    false
  end

  def full_name
    "#{first_name} #{last_name}"
  end

end
