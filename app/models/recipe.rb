class Recipe < ApplicationRecord
  has_many :ingredients
  belongs_to :author, class_name: 'User', foreign_key: :user_id, optional: true
  belongs_to :category, optional: true
end