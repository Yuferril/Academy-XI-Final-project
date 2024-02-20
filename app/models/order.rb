class Order < ApplicationRecord
    belongs_to :user
    has_many :order_items
    has_many :pokemons, through: :order_items

end
