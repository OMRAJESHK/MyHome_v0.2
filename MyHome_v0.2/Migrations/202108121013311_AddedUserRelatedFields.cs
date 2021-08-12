namespace MyHome_v0._2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedUserRelatedFields : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AspNetUsers", "AssetName", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.AspNetUsers", "AssetName");
        }
    }
}
