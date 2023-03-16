class User < ApplicationRecord
  has_many :recipes, dependent: :nullify

  has_secure_password
end