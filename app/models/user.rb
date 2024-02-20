class User < ApplicationRecord

    has_secure_password

    def admin?
        role == 'Admin'
    end

    def name
        username
    end

    has_many :orders
    has_many :order_items, through: :orders
    has_many :pokemons, through: :order_items

    validates :username, presence: true, uniqueness: true
    validates :role, presence: true
end
