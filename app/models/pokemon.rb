class Pokemon < ApplicationRecord
    has_many :order_items, dependent: :destroy
    has_many :orders, through: :order_items
    has_many :users, through: :order_items

    validates :name, presence: true, uniqueness: true
    validates :description, presence: true
    validates :price, presence: true

    scope :by_type, ->(type) { where("lower(type) = ?", type.downcase) }


end
