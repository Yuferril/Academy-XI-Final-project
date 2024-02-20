class CreateOrderItems < ActiveRecord::Migration[7.0]
  def change
    create_table :order_items do |t|
      t.references :order, foreign_key: true
      t.references :pokemon, foreign_key: true
      t.string :name
      t.integer :quantity, default: 1
      t.decimal :price, precision: 10, scale: 2
      t.string :sprite
      t.timestamps
    end
  end
end