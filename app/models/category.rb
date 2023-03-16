class Category < ApplicationRecord
  has_many :recipes, dependent: :nullify
end