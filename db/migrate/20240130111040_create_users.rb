class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :role
      t.string :password_digest
      t.string :email
      t.string :firstName
      t.string :lastName
      t.timestamps
    end
  end
end