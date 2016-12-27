class Company < ApplicationRecord
  has_many :users
  has_many :shifts
  validates_presence_of :name
end
