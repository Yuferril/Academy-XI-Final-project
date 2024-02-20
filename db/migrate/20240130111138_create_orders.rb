class CreateOrders < ActiveRecord::Migration[7.0]
  def change
    create_table :orders do |t|
      t.references :user, foreign_key: true
      t.string :address
      t.string :city
      t.string :state
      t.string :postal_code
      t.string :country
      t.string :credit_card_name
      t.string :credit_card_number
      t.string :credit_card_expiry
      t.timestamps
    end
  end
end